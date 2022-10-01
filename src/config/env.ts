import dotenv from 'dotenv';
dotenv.config();

export const envConfig = {
  API_PORT: process.env.PORT as string,
  NODE_ENV: process.env.NODE_ENV as string,
  CLIENT_DEV_URL: process.env.CLIENT_DEV_URL as string,
  CLIENT_PROD_URL: process.env.CLIENT_PROD_URL as string,
  SENTRY_DSN: process.env.SENTRY_DSN as string,
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET as string,
  JWT_ACCESS_TOKEN_EXP: process.env.JWT_ACCESS_TOKEN_EXP as string,
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET as string,
  JWT_REFRESH_TOKEN_EXP: process.env.JWT_REFRESH_TOKEN_EXP as string
};
