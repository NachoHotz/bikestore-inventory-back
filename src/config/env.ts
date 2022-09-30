import dotenv from 'dotenv';
dotenv.config();

export const envConfig = {
  API_PORT: process.env.PORT as string,
  NODE_ENV: process.env.NODE_ENV as string,
  CLIENT_DEV_URL: process.env.CLIENT_DEV_URL as string,
  CLIENT_PROD_URL: process.env.CLIENT_PROD_URL as string,
  SENTRY_DSN: process.env.SENTRY_DSN as string,
};
