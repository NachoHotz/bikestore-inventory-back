import { CookieType } from '../enums';
import { CookieOptsType } from '../types';

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
