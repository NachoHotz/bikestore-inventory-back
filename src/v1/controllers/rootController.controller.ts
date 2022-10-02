import { Request, Response } from 'express';
import * as rootService from '../services/rootService.service';

export const rootController = (
  _req: Request,
  res: Response,
) => {
  const response: string = rootService.SayHello();
  res.status(200).send({ status: 200, message: response });
};
