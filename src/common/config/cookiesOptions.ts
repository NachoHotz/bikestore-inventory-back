import { CookieOptions } from 'express';

export const SessionCookieOpts: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: true
};

export const RefreshCookieOpts: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: true
};
