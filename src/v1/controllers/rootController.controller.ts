import { Request, Response } from 'express';
import * as rootService from '../services/rootService.service';
import { BaseResponse } from '../types/responses/baseResponse';

export const rootController = (
  _req: Request,
  res: Response<BaseResponse<string>>,
) => {
  const response: string = rootService.SayHello();
  res.status(200).send({ status: 200, message: response });
};
