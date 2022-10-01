import { Request, Response, NextFunction } from 'express';
import { InternalServerException, NotFoundException } from '../exceptions';
import * as paymentMethodService from '../services/paymentMethod.service';

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const allPaymentMethods = await paymentMethodService.GetAll(next);

    if (!allPaymentMethods || allPaymentMethods.length === 0) {
      return next(new NotFoundException('No se encontraron metodos de pago'));
    }

    return res.status(200).send({ status: 200, allPaymentMethods });
  } catch (error: any) {
    return next(new InternalServerException(`Error getAllPaymentMethods controller: ${error.message}`));
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const createdPaymentMethod = await paymentMethodService.Create(req.body, next);

    if (!createdPaymentMethod) return;

    return res.status(201).send({ status: 201, createdPaymentMethod });
  } catch (error: any) {
    return next(new InternalServerException(`Error createPaymentMethod controller: ${error.message}`));
  }
}
