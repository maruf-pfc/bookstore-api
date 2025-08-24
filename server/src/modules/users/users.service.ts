import { pool } from '../../config/db';
import { AppError } from '../../utils/errorResponse';

export const getAllUsers = async () => {
  const { rows } = await pool.query(
    'SELECT id, name, email, role, created_at, updated_at FROM users ORDER BY created_at DESC'
  );
  return rows;
};

export const getUserById = async (id: number) => {
  const { rows } = await pool.query(
    'SELECT id, name, email, role, created_at, updated_at FROM users WHERE id = $1',
    [id]
  );
  if (!rows.length) throw new AppError('User not found', 404);
  return rows[0];
};

export const updateUser = async (id: number, name?: string, role?: string) => {
  const { rows } = await pool.query(
    `UPDATE users 
     SET name = COALESCE($1, name), 
         role = COALESCE($2, role), 
         updated_at = NOW()
     WHERE id = $3 
     RETURNING id, name, email, role, created_at, updated_at`,
    [name, role, id]
  );
  if (!rows.length) throw new AppError('User not found', 404);
  return rows[0];
};

export const deleteUser = async (id: number) => {
  const { rows } = await pool.query(
    'DELETE FROM users WHERE id = $1 RETURNING id, name, email, role',
    [id]
  );
  if (!rows.length) throw new AppError('User not found', 404);
  return rows[0];
};
