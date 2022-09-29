import dotenv from 'dotenv';
dotenv.config();

// IMPORTANT: Remove th DB envs you won´t use
export const envConfig = {
  API_PORT: process.env.PORT as string,
  NODE_ENV: process.env.NODE_ENV as string,
  DB_HOST: process.env.DB_HOST as string,
  DB_PORT: process.env.DB_PORT as string,
  DB_USER: process.env.DB_USER as string,
  DB_PASSWORD: process.env.DB_PASSWORD as string,
  DB_NAME: process.env.DB_NAME as string,
  DB_DIALECT: process.env.DB_DIALECT as string,
  MONGO_DEV_URI: process.env.MONGO_DEV_URI as string,
  MONGO_PROD_URI: process.env.MONGO_TEST_URI as string,
  CLIENT_DEV_URL: process.env.CLIENT_DEV_URL as string,
  CLIENT_PROD_URL: process.env.CLIENT_PROD_URL as string,
  SENTRY_DSN: process.env.SENTRY_DSN as string,
};
