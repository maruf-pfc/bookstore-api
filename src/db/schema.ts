import { pool } from '../config/db';

export const createTables = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(20) NOT NULL DEFAULT 'CUSTOMER',
      created_at TIMESTAMP DEFAULT NOW()
    );
    
    CREATE TABLE IF NOT EXISTS books (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255) NOT NULL,
      price NUMERIC(10, 2) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id),
      book_id INT REFERENCES books(id),
      quantity INT NOT NULL,
      total NUMERIC(10, 2) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
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