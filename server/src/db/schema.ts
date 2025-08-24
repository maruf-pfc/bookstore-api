import { pool } from '../config/db';

export const createTables = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(20) NOT NULL DEFAULT 'CUSTOMER',
      failed_attempts INT DEFAULT 0,
      lock_until TIMESTAMP NULL,
      refresh_token TEXT NULL,         -- store refresh token for JWT
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
    
    CREATE TABLE IF NOT EXISTS books (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255) NOT NULL,
      price NUMERIC(10, 2) NOT NULL,
      stock INT NOT NULL DEFAULT 0,   -- track stock quantity
      is_active BOOLEAN DEFAULT true, -- mark unavailable instead of deleting
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      total NUMERIC(10, 2) NOT NULL,
      status VARCHAR(20) NOT NULL DEFAULT 'PENDING', -- PENDING, PAID, CANCELLED
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id SERIAL PRIMARY KEY,
      order_id INT REFERENCES orders(id) ON DELETE CASCADE,
      book_id INT REFERENCES books(id),
      quantity INT NOT NULL,
      price NUMERIC(10, 2) NOT NULL -- price snapshot at time of purchase
    );
  `);
};

(async () => {
  try {
    await createTables();
    console.log('✅ Tables created');
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
})();
