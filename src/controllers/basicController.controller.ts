import { Request, Response, NextFunction } from 'express';
import * as basicService from '../services/basicService.service';

export const basicController = (
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const response: string = basicService.BasicService();
  res.status(200).send(response);
};
