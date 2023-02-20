import { Sale } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { InternalServerException, NotFoundException } from '../exceptions';
import { BaseResponse } from '../types/responses/baseResponse';
import * as saleService from '../services/order.service';

export async function getAll(_req: Request, res: Response<BaseResponse<Sale[]>>, next: NextFunction) {
  try {
    const allSales = await saleService.GetAll(next);

    if (!allSales || allSales.length === 0) {
      return next(new NotFoundException('No se encontraron ventas'));
    }

    return res.status(200).send({ status: 200, data: allSales });
  } catch (error: any) {
    return next(new InternalServerException(`Error getAllOrders controller: ${error.message}`));
  }
}

export async function create(req: Request, res: Response<BaseResponse<Sale>>, next: NextFunction) {
  try {
    const createdOrder = await saleService.Create(req.body, req.body.products, next);

    if (!createdOrder) return;

    return res.status(201).send({ status: 201, data: createdOrder });
  } catch (error: any) {
    return next(new InternalServerException(`Error createOrder controller: ${error.message}`));
  }
}

export async function update(req: Request, res: Response<BaseResponse<Sale>>, next: NextFunction) {
  const id = parseInt(req.params.id, 10);

  try {

    const updatedOrder = await saleService.Update(id, req.body, next);

    if (!updatedOrder) return;

    return res.status(200).send({ status: 200, message: 'Venta actualizada con éxito', data: updatedOrder });
  } catch (error: any) {
    return next(new InternalServerException(`Error updateOrder controller: ${error.message}`));
  }
}

export async function deleteOne(req: Request, res: Response<BaseResponse<Sale>>, next: NextFunction) {
  const id = parseInt(req.params.id, 10);

  try {
    const deletedOrder = await saleService.Delete(id, next);

    if (!deletedOrder) return;

    return res.status(200).send({ status: 200, message: 'Venta eliminada con éxito', data: deletedOrder });
  } catch (error: any) {
    return next(new InternalServerException(`Error deleteOrder controller: ${error.message}`));
  }
}
