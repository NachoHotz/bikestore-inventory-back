/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextFunction, Request, Response } from 'express';
import { InternalServerException } from '../exceptions';
import { envConfig, TokenType } from '../../common/config';
import { createToken } from '../../common/lib';
import { RequestExtended } from '../../common/interfaces';
import * as authService from '../services/auth.service';

const { JWT_ACCESS_TOKEN_EXP, JWT_REFRESH_TOKEN_EXP } = envConfig;

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const userInfo = await authService.Login(req.body, next);

    if (!userInfo) return;

    res.cookie('session_token', userInfo.access_token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: new Date(Date.now())
    });

    res.cookie('refresh_token', userInfo.refresh_token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: new Date(Date.now())
    });

    return res.status(200).send({ user: { ...userInfo.current_user, password: null } });
  } catch (error: any) {
    return next(new InternalServerException(`Error login controller: ${error.message}`));
  }
}

export async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    const userInfo = await authService.SignUp(req.body, next);

    if (!userInfo) {
      return next(new InternalServerException('Hubo un error en el registro. Por favor intenta nuevamente'));
    }

    res.cookie('session_token', userInfo.access_token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: new Date(Date.now() + JWT_ACCESS_TOKEN_EXP)
    });

    res.cookie('refresh_token', userInfo.refresh_token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: new Date(Date.now() + JWT_REFRESH_TOKEN_EXP)
    });

    return res.status(200).send({ user: { ...userInfo.current_user, password: null } });
  } catch (error: any) {
    return next(new InternalServerException(`Error signUp controller: ${error.message}`));
  }
}

export async function logOut(_req: Request, res: Response) {
  res.clearCookie('session_token');
  res.clearCookie('refresh_token');

  return res.sendStatus(204);
}

export function refreshAccessToken(req: RequestExtended, res: Response, next: NextFunction) {
  const { user } = req;

  if (!user) {
    return next(new InternalServerException('No user obtained by JWT decoding.'));
  }

  try {
    const access_token = createToken(user, TokenType.access);

    res.cookie('session_token', access_token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
    });

    return res.sendStatus(204);
  } catch (error: any) {
    return next(new InternalServerException(`Error refreshTokens controller: ${error.message}`));
  }

}
