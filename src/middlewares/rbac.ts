import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';
import { AppError } from '../utils/errorResponse';

export const authorize = (allowedRoles: Array<'ADMIN' | 'STAFF' | 'CUSTOMER'>) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) throw new AppError('Not authenticated', 401);

    if (!allowedRoles.includes(req.user.role)) {
      throw new AppError('Forbidden: You do not have access to this resource', 403);
    }

    next();
  };
};
