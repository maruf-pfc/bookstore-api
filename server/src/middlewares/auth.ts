import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import { AppError } from '../utils/errorResponse';

export interface AuthRequest extends Request {
  user?: {
    id: number;
    role: 'ADMIN' | 'STAFF' | 'CUSTOMER';
  };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Authorization token missing', 401);
    }

    const token = authHeader.split(' ')[1];
    const payload = verifyAccessToken(token);

    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch (err) {
    next(err);
  }
};
