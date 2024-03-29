/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { InternalServerException } from '../exceptions';
import { createToken } from '../../common/lib';
import { RequestExtended } from '../../common/interfaces';
import { BaseResponse } from '../types/responses/baseResponse';
import * as authService from '../services/auth.service';
import { CookieType, TokenType } from '../../common/enums';
import { CookieOpts } from '../../common/config';

export async function login(req: Request, res: Response<BaseResponse<User>>, next: NextFunction) {
  try {
    const userInfo = await authService.Login(req.body, next);

    if (!userInfo) return;

    res.cookie(CookieType.session, userInfo.session_token, CookieOpts.session_token);
    res.cookie(CookieType.refresh, userInfo.refresh_token, CookieOpts.refresh_token);

    return res.status(200).send({ status: 200, message: 'Inicio de sesión exitoso', data: userInfo.current_user });
  } catch (error: any) {
    return next(new InternalServerException(`Error login controller: ${error.message}`));
  }
}

export async function signUp(req: Request, res: Response<BaseResponse<User>>, next: NextFunction) {
  try {
    const userInfo = await authService.SignUp(req.body, next);

    if (!userInfo) {
      return next(new InternalServerException('Hubo un error en el registro. Por favor intenta nuevamente'));
    }

    res.cookie(CookieType.session, userInfo.session_token, CookieOpts.session_token);
    res.cookie(CookieType.refresh, userInfo.refresh_token, CookieOpts.refresh_token);

    return res.status(200).send({ status: 200, message: 'Registro exitoso',  data: userInfo.current_user });
  } catch (error: any) {
    return next(new InternalServerException(`Error signUp controller: ${error.message}`));
  }
}

export async function logOut(_req: Request, res: Response) {
  res.clearCookie(CookieType.session);
  res.clearCookie(CookieType.refresh);

  return res.sendStatus(204);
}

export function refreshSessionToken(req: RequestExtended, res: Response, next: NextFunction) {
  const { user } = req;

  if (!user) {
    return next(new InternalServerException('No user obtained by JWT decoding.'));
  }

  try {
    const session_token = createToken(user, TokenType.session);

    res.cookie(CookieType.session, session_token, CookieOpts.session_token);

    return res.sendStatus(204);
  } catch (error: any) {
    return next(new InternalServerException(`Error refreshTokens controller: ${error.message}`));
  }
}
