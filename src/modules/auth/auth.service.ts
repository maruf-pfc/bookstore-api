import { pool } from '../../config/db';
import { hashPassword, verifyPassword } from '../../utils/passwords';
import { signAccessToken, signRefreshToken, JwtPayload } from '../../utils/jwt';
import { AppError } from '../../utils/errorResponse';

export type User = {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'STAFF' | 'CUSTOMER';
  password?: string;
};

export const register = async (name: string, email: string, password: string, retypePassword: string): Promise<User> => {
  if (!name || !email || !password || !retypePassword) {
    throw new AppError('All fields are required', 400);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new AppError('Invalid email format');
  }

  const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  if (existingUser.rows.length) {
    throw new AppError('Email already in use');
  }

  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_])[A-Za-z\d!@#$%^&*()_]{8,}$/;

  /*
    (?=.*[a-z])    → at least 1 lowercase
    (?=.*[A-Z])    → at least 1 uppercase
    (?=.*\d)       → at least 1 number
    (?=.*[!@#$%^&*()_+]) → at least 1 special character from !@#$%^&*()_+
    [A-Za-z\d!@#$%^&*()_+]{8,} → allows only letters, numbers, and the listed special characters, minimum 8 chars
  */

  if (!strongPasswordRegex.test(password)) {
    throw new AppError(
      'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character'
    );
  }

  // 5. Check password match
  if (password !== retypePassword) {
    throw new AppError('Passwords do not match');
  }

  const hashed = await hashPassword(password);

  const { rows } = await pool.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, role',
    [name, email, hashed]
  );

  return rows[0];
};

export const login = async (email: string, password: string) => {
  if (!email || !password) {
    throw new AppError('All fields are required', 400);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new AppError('Invalid email format', 400);
  }

  const { rows } = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
  const user = rows[0];

  if (!user) throw new AppError('Invalid email or password', 401);

  const now = new Date();
  if (user.lock_until && now < new Date(user.lock_until)) {
    const waitMinutes = Math.ceil((new Date(user.lock_until).getTime() - now.getTime()) / 60000);
    throw new AppError(`Account locked. Try again after ${waitMinutes} minute(s).`, 403);
  }

  const valid = await verifyPassword(password, user.password);

  if (!valid) {
    // Increment failed attempts
    let failedAttempts = (user.failed_attempts || 0) + 1;
    let lockUntil: Date | null = null;

    if (failedAttempts >= 3) {
      // Lock account for 15 minutes
      lockUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now
      failedAttempts = 0; // reset after locking
      await pool.query(
        'UPDATE users SET failed_attempts=$1, lock_until=$2 WHERE id=$3',
        [failedAttempts, lockUntil, user.id]
      );
      throw new AppError(`Account locked due to 3 failed attempts. Try again after 15 minutes.`, 403);
    } else {
      const remaining = 3 - failedAttempts;
      await pool.query(
        'UPDATE users SET failed_attempts=$1 WHERE id=$2',
        [failedAttempts, user.id]
      );
      throw new AppError(`Password not matched. You have ${remaining} attempt(s) left.`, 401);
    }
  }

  // Successful login: reset failed attempts and lock
  await pool.query(
    'UPDATE users SET failed_attempts=0, lock_until=NULL WHERE id=$1',
    [user.id]
  );

  const payload: JwtPayload = { sub: user.id, role: user.role };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};
