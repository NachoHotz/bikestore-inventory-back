import { Request, Response, NextFunction } from 'express';
import InternalServerException from '../exceptions/InternalServerError';
import NotFoundException from '../exceptions/NotFoundException';
import * as productService from '../services/product.service';

export async function getAllProducts(req: Request, res: Response, next: NextFunction) {
  try {
    const allProducts = await productService.GetAllProducts(next);

    if (!allProducts || allProducts.length === 0) {
      return next(new NotFoundException('No se encontraron productos'));
    }

    return res.status(200).send(allProducts);
  } catch (error: any) {
    /* handle error */
    return next(new InternalServerException(`Error getAllProducts controller: ${error.message}`));
  }
}
