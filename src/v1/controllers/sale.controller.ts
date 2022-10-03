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
