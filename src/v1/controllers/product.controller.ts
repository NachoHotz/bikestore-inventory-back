import { Request, Response, NextFunction } from 'express';
import InternalServerException from '../exceptions/InternalServerError';
import NotFoundException from '../exceptions/NotFoundException';
import * as productService from '../services/product.service';

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const allProducts = await productService.GetAll(next);

    if (!allProducts || allProducts.length === 0) {
      return next(new NotFoundException('No se encontraron productos'));
    }

    return res.status(200).send(allProducts);
  } catch (error: any) {
    return next(new InternalServerException(`Error getAllProducts controller: ${error.message}`));
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const createdProduct = await productService.Create(req.body, next);

    if (!createdProduct) return;

    return res.status(201).send(createdProduct);
  } catch (error: any) {
    return next(new InternalServerException(`Error createProduct controller: ${error.message}`));
  }
}
