import { Request, Response, NextFunction } from 'express';
import InternalServerException from '../exceptions/InternalServerError';
import NotFoundException from '../exceptions/NotFoundException';
import * as userService from '../services/user.service';

export async function getUsers(_req: Request, res: Response, next: NextFunction) {
  try {
    const users = await userService.GetUsers(next);

    if (!users || users.length === 0) {
      return next(new NotFoundException('No users found'));
    }

    return res.status(200).send(users);
  } catch (error: any) {
    return next(new InternalServerException(`Error getUsers controller: ${error.message}`));
  }
}
