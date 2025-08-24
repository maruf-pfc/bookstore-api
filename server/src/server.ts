import { env } from './config/env';
import { app, connectDB } from './app';
import { logger } from './lib/logger';

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(env.PORT, () => {
      logger.info(`\n🚀 Server ready on http://localhost:${env.PORT}`);
      logger.info(`\n📖 API docs available at http://localhost:${env.PORT}/docs`);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err) => {
      logger.error({ err }, 'Unhandled Rejection');
      server.close(() => process.exit(1));
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (err) => {
      logger.error({ err }, 'Uncaught Exception');
      server.close(() => process.exit(1));
    });
  } catch (err) {
    logger.error({ err }, 'Failed to start server');
    process.exit(1);
  }
};

startServer();
