import { NextFunction, Request, Response } from 'express';
import { CookieType, prisma, TokenType } from '../../common/config';
import { RequestExtended } from '../../common/interfaces';
import { decodeToken } from '../../common/lib/jwt';
import { InvalidTokenException, MissingTokenException } from '../exceptions';

export async function verifySessionToken(req: Request, _res: Response, next: NextFunction) {
  const token: string = req.cookies[CookieType.session];

  if (!token || token === '') {
    return next(new MissingTokenException(TokenType.session));
  }

  try {
    const userInfo = decodeToken(token, TokenType.session);

    const userInDB = await prisma.user.findUnique({ where: { email: userInfo.email } });

    if (!userInDB) {
      return next(new InvalidTokenException(TokenType.session));
    }

  } catch (error: any) {
    return next(new InvalidTokenException(TokenType.session, error.message));
  }

  next();
}
export async function verifyRefreshToken(req: RequestExtended, _res: Response, next: NextFunction) {
  if (!req.cookies[CookieType.refresh]) {
    return next(new MissingTokenException(TokenType.refresh));
  }

  const refreshToken: string = req.cookies[CookieType.refresh];

  try {
    const decodedRefreshToken = decodeToken(refreshToken, TokenType.refresh);
    const user = await prisma.user.findUnique({ where: { email: decodedRefreshToken.email } });

    if (!user) {
      return next(new InvalidTokenException(TokenType.refresh));
    }

    req.user = user;
  } catch (error: any) {
    return next(new InvalidTokenException(TokenType.refresh, error.message));
  }
  next();
}
