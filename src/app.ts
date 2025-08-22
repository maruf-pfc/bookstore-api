import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env';
import { errorHandler } from './middlewares/error';
import { rateLimiter } from './middlewares/rateLimit';
import { logger } from './lib/logger';

export const app = express();

app.use(helmet());
app.use(cors({ 
    origin: env.CORS_ORIGIN, 
    credentials: true 
}));
app.use(express.json());
app.use(rateLimiter);

app.use((req, _res, next) => {
    logger.info({ 
        id: (req as any).id, 
        method: req.method, 
        path: req.path 
    }, 'request');
    next();
});

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use(errorHandler);