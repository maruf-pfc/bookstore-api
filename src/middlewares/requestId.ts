import { randomUUID } from 'crypto';
import { type RequestHandler } from 'express';

export const requestId: RequestHandler = (req, _res, next) => {
  (req as any).id = req.headers['x-request-id'] || randomUUID();
  next();
};