import { NextFunction, Request, Response } from 'express';
import { prisma } from '../../config';
import { RequestExtended } from '../../interfaces';
import { decodeToken } from '../../lib/jwt';
import { BadRequestException, InvalidToken } from '../exceptions';

export async function verifyAcessJwt(req: Request, _res: Response, next: NextFunction) {
  const token = req.cookies['session_token'];

  if (!token || token === '') {
    return next(new BadRequestException('No access token provided'));
  }

  try {
    const userInfo = decodeToken(token, 'access');

    const userInDB = await prisma.user.findUnique({ where: { email: userInfo.email } });

    if (!userInDB) {
      return next(new InvalidToken('access'));
    }

  } catch (error: any) {
    return next(new InvalidToken(error));
  }

  next();
}
export async function verifyRefreshJwt(req: RequestExtended, _res: Response, next: NextFunction) {
  if (!req.cookies['refresh_token']) {
    return next(new BadRequestException('No refresh token provided'));
  }

  const refreshToken = req.cookies['refresh_token'];

  try {
    const decodedRefreshToken = decodeToken(refreshToken, 'refresh');
    const user = await prisma.user.findUnique({ where: { email: decodedRefreshToken.email } });

    if (!user) {
      return next(new InvalidToken('refresh'));
    }

    req.user = user;
  } catch (error: any) {
    return next(new InvalidToken('refrehs', error));
  }
  next();
}
