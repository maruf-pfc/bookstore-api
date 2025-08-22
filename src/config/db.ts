import pkg from 'pg';
import { env } from './env';

const { Pool } = pkg;

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

pool.connect()
  .then(client => {
    console.log('✅ Connected to PostgreSQL');
    client.release();
  })
  .catch(err => {
    console.error('❌ PostgreSQL connection error:', err);
    process.exit(1);
  });
