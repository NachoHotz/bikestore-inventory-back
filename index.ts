import app from './src/app';
import { envConfig, logger, prisma } from './src/common/config';
import { SERVER_URLS } from './src/common/constants';

const { API_PORT, NODE_ENV } = envConfig;
const currentServerUrl = SERVER_URLS[NODE_ENV as keyof typeof SERVER_URLS];

app.listen(API_PORT || 3001, () => {
  prisma.$connect().then(() => {
    logger.info('Database connection successfull');
    logger.info(`Server running on PORT ${API_PORT || 3001} in ${NODE_ENV} mode. URL - ${currentServerUrl}`);
  }).catch((error) => {
    logger.error(`Database connection ${error}`);
    process.exit(1);
  });
});

