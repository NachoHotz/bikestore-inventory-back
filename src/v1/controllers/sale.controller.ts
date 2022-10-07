import { Request, Response, NextFunction } from 'express';
import { InternalServerException, NotFoundException } from '../exceptions';
import * as saleService from '../services/sale.service';

export async function getAll(_req: Request, res: Response, next: NextFunction) {
  try {
    const allSales = await saleService.GetAll(next);

    if (!allSales || allSales.length === 0) {
      return next(new NotFoundException('No se encontraron ventas'));
    }

    return res.status(200).send({ status: 200, allSales });
  } catch (error: any) {
    return next(new InternalServerException(`Error getAllSales controller: ${error.message}`));
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const createdSale = await saleService.Create(req.body, req.body.products, next);

    if (!createdSale) return;

    return res.status(201).send({ status: 201, createdSale });
  } catch (error: any) {
    return next(new InternalServerException(`Error createSale controller: ${error.message}`));
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  const id = parseInt(req.params.id, 10);

  try {

    const updatedSale = await saleService.Update(id, req.body, next);

    if (!updatedSale) return;

    return res.status(200).send({ status: 200, message: 'Venta actualizada con éxito', updatedSale });
  } catch (error: any) {
    return next(new InternalServerException(`Error updateService controller: ${error.message}`));
  }
}

export async function deleteOne(req: Request, res: Response, next: NextFunction) {
  const id = parseInt(req.params.id, 10);

  try {
    const deletedSale = await saleService.Delete(id, next);

    if (!deletedSale) return;

    return res.status(200).send({ status: 200, message: 'Venta eliminada con éxito' });
  } catch (error: any) {
    return next(new InternalServerException(`Error deleteSale controller: ${error.message}`));
  }
}
