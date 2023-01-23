import { AnyZodObject } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { BadRequestException } from '../exceptions';

export const validateSchema = (schema: AnyZodObject) => (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params
    });

    next();
  } catch (error: any) {
    return next(new BadRequestException(error));
  }
};
