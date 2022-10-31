import { NextFunction, Request, Response } from 'express';
import { prisma, TokenType } from '../../common/config';
import { RequestExtended } from '../../common/interfaces';
import { decodeToken } from '../../common/lib/jwt';
import { InvalidTokenException, MissingTokenException } from '../exceptions';

export async function verifyAcessJwt(req: Request, _res: Response, next: NextFunction) {
  const token = req.cookies['session_token'];

  if (!token || token === '') {
    return next(new MissingTokenException(TokenType.access));
  }

  try {
    const userInfo = decodeToken(token, TokenType.access);

    const userInDB = await prisma.user.findUnique({ where: { email: userInfo.email } });

    if (!userInDB) {
      return next(new InvalidTokenException(TokenType.access));
    }

  } catch (error: any) {
    return next(new InvalidTokenException(error));
  }

  next();
}
export async function verifyRefreshJwt(req: RequestExtended, _res: Response, next: NextFunction) {
  if (!req.cookies['refresh_token']) {
    return next(new MissingTokenException(TokenType.refresh));
  }

  const refreshToken = req.cookies['refresh_token'];

  try {
    const decodedRefreshToken = decodeToken(refreshToken, TokenType.refresh);
    const user = await prisma.user.findUnique({ where: { email: decodedRefreshToken.email } });

    if (!user) {
      return next(new InvalidTokenException(TokenType.refresh));
    }

    req.user = user;
  } catch (error: any) {
    return next(new InvalidTokenException(TokenType.refresh, error));
  }
  next();
}
