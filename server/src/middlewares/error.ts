import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errorResponse';

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);

  const statusCode = err instanceof AppError ? err.statusCode : 500;

  let errorMessage: string = 'Internal Server Error';

  // 1. If AppError, use its message
  if (err instanceof AppError && typeof err.message === 'string') {
    errorMessage = err.message;
  }
  // 2. If it's a Zod or similar validation error (array/object)
  else if (Array.isArray(err?.errors)) {
    errorMessage = err.errors.map((e: { message: any; }) => {
      if (typeof e.message === 'string') return e.message;
      return JSON.stringify(e);
    }).join(', ');
  }
  // 3. If a normal Error
  else if (typeof err.message === 'string') {
    errorMessage = err.message;
  }
  // 4. Fallback: stringify anything else
  else {
    errorMessage = JSON.stringify(err);
  }

  res.status(statusCode).json({
    ok: false,
    error: errorMessage, // always a string now
  });
};