import { env } from './config/env';
import { app } from './app';
import { logger } from './lib/logger';

const server = app.listen(env.PORT, () => {
    logger.info({ port: env.PORT }, `🚀 Server ready on http://localhost:${env.PORT}`);
});

process.on('unhandledRejection', (err) => {
    logger.error({ err }, 'Unhandled Rejection');
    server.close(() => process.exit(1));
});