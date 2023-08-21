import { CookieOptions } from 'express';
import { CookieType } from './enums';

export type CookieOptsType = {
  [key in CookieType]: CookieOptions
}

export const CookieOpts: CookieOptsType = {
  [CookieType.session]: {
    httpOnly: true,
    sameSite: 'lax',
    secure: true
  },
  [CookieType.refresh]: {
    httpOnly: true,
    sameSite: 'lax',
    secure: true
  }
};
