/* eslint-disable import/prefer-default-export */
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import * as express from 'express';
import BadRequestException from '../../../exceptions/BadRequestException';

export function requestValidation<T>(
  type: any,
  toValidate: any,
): express.RequestHandler {
  return (_req, _res, next) => {
    validate(plainToInstance(type, toValidate)).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors
            .map((error: ValidationError) =>
              Object.values(error.constraints as { [type: string]: string }),
            )
            .join(', ');
          next(
            new BadRequestException(
              message.split(',').map((err) => err.trim()),
            ),
          );
        } else {
          next();
        }
      },
    );
  };
}
