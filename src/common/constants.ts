import { TokenType } from './enums';
import { envConfig } from './config/env';
import { IJwtTokenConfig } from './types';

const {
  SERVER_DEV_URL,
  SERVER_PROD_URL,
  JWT_ACCESS_TOKEN_EXP,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_EXP,
  JWT_REFRESH_TOKEN_SECRET
} = envConfig;

export const SERVER_URLS = {
  development: SERVER_DEV_URL,
  production: SERVER_PROD_URL
};

export const JwtTokenConfig: IJwtTokenConfig = {
  [TokenType.session]: {
    secret: JWT_ACCESS_TOKEN_SECRET,
    exp: JWT_ACCESS_TOKEN_EXP
  },
  [TokenType.refresh]: {
    secret: JWT_REFRESH_TOKEN_SECRET,
    exp: JWT_REFRESH_TOKEN_EXP
  }
};
