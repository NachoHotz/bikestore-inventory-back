import { CookieOptions } from 'express';
import { CookieType, TokenType } from './enums';

export type IJwtTokenConfig = {
  [key in TokenType]: {
    secret: string;
    exp: string;
  }
}

export type CookieOptsType = {
  [key in CookieType]: CookieOptions
}

