import 'reflect-metadata';
import app from './src/app';
import { envConfig, logger } from './src/config';
import { AppDataStore } from './src/db/connection';

const { API_PORT, NODE_ENV } = envConfig;

AppDataStore.initialize().then(() => {
  logger.log('info','Database connection established');
  app.listen(API_PORT || 3001, () => {
    logger.log('info', `Server running on PORT ${API_PORT || 3001} in ${NODE_ENV} mode`);
  });
}).catch((error) => {
  logger.error(`Database connection error: ${error}`);
});

