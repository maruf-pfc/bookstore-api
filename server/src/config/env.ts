import { z } from 'zod';
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    PORT: z.coerce.number().default(5000),
    CORS_ORIGIN: z.string().default('*'),

    JWT_ACCESS_SECRET: z.string().min(20),
    JWT_REFRESH_SECRET: z.string().min(20),
    JWT_ACCESS_EXPIRES: z.string().default('15m'),
    JWT_REFRESH_EXPIRES: z.string().default('7d'),
    REFRESH_COOKIE_NAME: z.string().default('refresh_token'),

    DATABASE_URL: z.string().url(),
    LOG_LEVEL: z.string().default('info'),
});

export const env = envSchema.parse(process.env);