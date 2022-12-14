import app from './src/app';
import { envConfig, logger, prisma } from './src/common/config';

const { API_PORT, NODE_ENV } = envConfig;

app.listen(API_PORT || 3001, () => {
  prisma.$connect().then(() => {
    logger.info('Database connection successfull');
    logger.info(`Server running on PORT ${API_PORT || 3001} in ${NODE_ENV} mode`);
  }).catch((error) => {
    logger.error(`Database connection ${error}`);
    process.exit(1);
  });
});

