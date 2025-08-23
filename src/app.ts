import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env';
import { pool } from './config/db';
import { errorHandler } from './middlewares/error';
import { rateLimiter } from './middlewares/rateLimit';
import { logger } from './lib/logger';
import booksRoutes from './modules/books/books.routes';

export const app = express();

// Middleware
app.use(helmet());
app.use(cors({ 
  origin: env.CORS_ORIGIN, 
  credentials: true 
}));
app.use(express.json());
app.use(rateLimiter);

// Logger for requests
app.use((req, _res, next) => {
  logger.info({ 
    id: (req as any).id, 
    method: req.method, 
    path: req.path 
  }, 'request');
  next();
});

// Health check
app.get('/health', (_req, res) => res.json({ ok: true }));

// All routes
app.use('/api/books', booksRoutes);

// Error handler
app.use(errorHandler);

// DB connection test (optional)
export const connectDB = async () => {
  try {
    await pool.connect();
    logger.info('✅ PostgreSQL connected');
  } catch (err) {
    logger.error(err, '❌ PostgreSQL connection failed');
    process.exit(1);
  }
};
