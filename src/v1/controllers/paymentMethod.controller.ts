import { Request, Response, NextFunction } from 'express';
import { InternalServerException, NotFoundException } from '../exceptions';
import * as paymentMethodService from '../services/paymentMethod.service';

export async function getAll(_req: Request, res: Response, next: NextFunction) {
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

export async function update(req: Request, res: Response, next: NextFunction) {
  const id = parseInt(req.params.id, 10);

  try {

    const updatedPaymentMethod = await paymentMethodService.Update(id, req.body, next);

    if (!updatedPaymentMethod) return;

    return res.status(200).send({ status: 200, message: 'Método de pago actualizado con éxito', updatedPaymentMethod });
  } catch (error: any) {
    return next(new InternalServerException(`Error updatePaymentMethod controller: ${error.message}`));
  }
}

export async function deleteOne(req: Request, res: Response, next: NextFunction) {
  const id = parseInt(req.params.id, 10);

  try {

    const deletedPaymentMethod = await paymentMethodService.Delete(id, next);

    if (!deletedPaymentMethod) return;

    return res.status(200).send({ status: 200, message: 'Metodo de pago eliminado con éxito' });
  } catch (error: any) {
    return next(new InternalServerException(`Error deletePaymentMethod controller: ${error.message}`));
  }
}
