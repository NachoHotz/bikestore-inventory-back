import { PaymentMethod } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { InternalServerException, NotFoundException } from '../exceptions';
import { BaseResponse } from '../types/responses/baseResponse';
import * as paymentMethodService from '../services/paymentMethod.service';

export async function getAll(_req: Request, res: Response<BaseResponse<PaymentMethod[]>>, next: NextFunction) {
  try {
    const allPaymentMethods = await paymentMethodService.GetAll(next);

    if (!allPaymentMethods || allPaymentMethods.length === 0) {
      return next(new NotFoundException('No se encontraron metodos de pago'));
    }

    return res.status(200).send({ status: 200, data: allPaymentMethods });
  } catch (error: any) {
    return next(new InternalServerException(`Error getAllPaymentMethods controller: ${error.message}`));
  }
}

export async function create(req: Request, res: Response<BaseResponse<PaymentMethod>>, next: NextFunction) {
  try {
    const createdPaymentMethod = await paymentMethodService.Create(req.body, next);

    if (!createdPaymentMethod) return;

    return res.status(201).send({ status: 201, message: 'Metodo de pago creado con exito', data: createdPaymentMethod });
  } catch (error: any) {
    return next(new InternalServerException(`Error createPaymentMethod controller: ${error.message}`));
  }
}

export async function update(req: Request, res: Response<BaseResponse<PaymentMethod>>, next: NextFunction) {
  const id = parseInt(req.params.id, 10);

  try {

    const updatedPaymentMethod = await paymentMethodService.Update(id, req.body, next);

    if (!updatedPaymentMethod) return;

    return res.status(200).send({ status: 200, message: 'Método de pago actualizado con éxito', data: updatedPaymentMethod });
  } catch (error: any) {
    return next(new InternalServerException(`Error updatePaymentMethod controller: ${error.message}`));
  }
}

export async function deleteOne(req: Request, res: Response<BaseResponse<PaymentMethod>>, next: NextFunction) {
  const id = parseInt(req.params.id, 10);

  try {

    const deletedPaymentMethod = await paymentMethodService.Delete(id, next);

    if (!deletedPaymentMethod) return;

    return res.status(200).send({ status: 200, message: 'Metodo de pago eliminado con éxito', data: deletedPaymentMethod });
  } catch (error: any) {
    return next(new InternalServerException(`Error deletePaymentMethod controller: ${error.message}`));
  }
}
