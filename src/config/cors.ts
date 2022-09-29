import { CorsOptions } from 'cors';
import { envConfig } from './env';

const { NODE_ENV, CLIENT_PROD_URL, CLIENT_DEV_URL } = envConfig;

export const corsOptions: CorsOptions = {
  origin: NODE_ENV === 'development' ? CLIENT_DEV_URL : CLIENT_PROD_URL,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};
