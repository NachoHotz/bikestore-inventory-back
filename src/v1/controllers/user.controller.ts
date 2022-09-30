import { Request, Response, NextFunction } from 'express';
import { InternalServerException, NotFoundException } from '../exceptions';
import * as userService from '../services/user.service';

export async function getUsers(_req: Request, res: Response, next: NextFunction) {
  try {
    const users = await userService.GetUsers(next);

    if (!users || users.length === 0) {
      return next(new NotFoundException('No se encontraron usuarios'));
    }

    return res.status(200).send(users);
  } catch (error: any) {
    return next(new InternalServerException(`Error getUsers controller: ${error.message}`));
  }
}
