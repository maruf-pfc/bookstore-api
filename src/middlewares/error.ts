import { ZodError } from 'zod';
import type { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    if (err instanceof ZodError) {
        return res.status(400).json({ message: 'Validation error', issues: err.flatten() });
    }
    const status = (err?.status as number) || 500;
    const message = err?.message || 'Internal Server Error';
    res.status(status).json({ message });
};