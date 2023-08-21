import { CorsOptions } from 'cors';
import { NodeEnvs } from '../enums';
import { envConfig } from './env';

const { NODE_ENV, CLIENT_PROD_URL, CLIENT_DEV_URL } = envConfig;

export const corsOptions: CorsOptions = {
  origin: NODE_ENV === NodeEnvs.development ? CLIENT_DEV_URL : CLIENT_PROD_URL,
};
