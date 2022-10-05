import { NextFunction, Request, Response } from 'express';
import { prisma } from '../../config';
import { RequestExtended } from '../../interfaces';
import { decodeToken } from '../../lib/jwt';
import { InvalidTokenException, MissingTokenException } from '../exceptions';

export async function verifyAcessJwt(req: Request, _res: Response, next: NextFunction) {
  const token = req.cookies['session_token'];

  if (!token || token === '') {
    return next(new MissingTokenException('access'));
  }

  try {
    const userInfo = decodeToken(token, 'access');

    const userInDB = await prisma.user.findUnique({ where: { email: userInfo.email } });

    if (!userInDB) {
      return next(new InvalidTokenException('access'));
    }

  } catch (error: any) {
    return next(new InvalidTokenException(error));
  }

  next();
}
export async function verifyRefreshJwt(req: RequestExtended, _res: Response, next: NextFunction) {
  if (!req.cookies['refresh_token']) {
    return next(new MissingTokenException('refresh'));
  }

  const refreshToken = req.cookies['refresh_token'];

  try {
    const decodedRefreshToken = decodeToken(refreshToken, 'refresh');
    const user = await prisma.user.findUnique({ where: { email: decodedRefreshToken.email } });

    if (!user) {
      return next(new InvalidTokenException('refresh'));
    }

    req.user = user;
  } catch (error: any) {
    return next(new InvalidTokenException('refrehs', error));
  }
  next();
}
