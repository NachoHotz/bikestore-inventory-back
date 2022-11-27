import { CookieOptions } from 'express';
import { envConfig } from '../../common/config';

const { JWT_ACCESS_TOKEN_EXP, JWT_REFRESH_TOKEN_EXP } = envConfig;

export const SessionCookieOpts: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: true,
  expires: new Date(Date.now() + JWT_ACCESS_TOKEN_EXP)
};

export const RefreshCookieOpts: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: true,
  expires: new Date(Date.now() + JWT_REFRESH_TOKEN_EXP)
};
