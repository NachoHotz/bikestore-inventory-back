import 'reflect-metadata';
import app from './src/app';
import { envConfig, logger } from './src/config';

const { API_PORT, NODE_ENV } = envConfig;

app.listen(API_PORT || 3001, () => {
  logger.log('info', `Server running on PORT ${API_PORT || 3001} in ${NODE_ENV} mode`);
});

