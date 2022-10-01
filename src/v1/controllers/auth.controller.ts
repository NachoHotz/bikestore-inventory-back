import { NextFunction, Request, Response } from 'express';
import { InternalServerException } from '../exceptions';
import * as authService from '../services/auth.service';

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const userInfo = await authService.Login(req.body, next);

    if (!userInfo) return;

    return res.status(200).send(userInfo);
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

    return res.status(200).send(userInfo);
  } catch (error: any) {
    return next(new InternalServerException(`Error signUp controller: ${error.message}`));
  }
}
