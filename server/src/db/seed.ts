import { pool } from '../config/db';
import { hashPassword } from '../utils/passwords';

export const seed = async () => {
  const hashed = await hashPassword('maruf');

  await pool.query(`
    INSERT INTO users (name, email, password, role)
    VALUES ('Admin', 'admin@bookstore.com', $1, 'ADMIN')
    ON CONFLICT DO NOTHING;
  `, [hashed]);

  await pool.query(`
    INSERT INTO books (title, author, price)
    VALUES 
      ('The Great Gatsby', 'F. Scott Fitzgerald', 10.99),
      ('1984', 'George Orwell', 9.99)
    ON CONFLICT DO NOTHING;
  `);
};

(async () => {
  try {
    await seed();
    console.log('✅ Seed completed');
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
})();