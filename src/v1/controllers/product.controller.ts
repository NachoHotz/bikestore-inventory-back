import { Request, Response, NextFunction } from 'express';
import { IQuery } from '../../interfaces';
import { InternalServerException, NotFoundException } from '../exceptions';
import * as productService from '../services/product.service';

export async function getAll(req: Request, res: Response, next: NextFunction) {
  let query: Partial<IQuery> = {};

  if (Object.entries(req.query).length !== 0) {
    const provider = req.query.provider?.toString().split(',');
    const category = req.query.category?.toString().split(',');

    query = {
      q: req.query.q as string,
      category: category ? category : [],
      provider: provider ? provider : [],
    };
  }

  try {
    if (Object.entries(query).length !== 0) {
      const productsQuery = await productService.GetByQuery(query, next);

      if (!productsQuery || productsQuery.length === 0) {
        return next(new NotFoundException('No se encontraron productos'));
      }

      return res.status(200).send({ status: 200, productsQuery });
    }

    const allProducts = await productService.GetAll(next);

    if (!allProducts || allProducts.length === 0) {
      return next(new NotFoundException('No se encontraron productos'));
    }

    return res.status(200).send({ status: 200, allProducts });
  } catch (error: any) {
    return next(new InternalServerException(`Error getAllProducts controller: ${error.message}`));
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  try {

    const uniqueProduct = await productService.GetById(id, next);

    if (!uniqueProduct) {
      return next(new NotFoundException('No se encontro el producto solicitado'));
    }

    return res.status(200).send({ status: 200, uniqueProduct });
  } catch (error: any) {
    return next(new InternalServerException(`Error getOneProducts controller: ${error.message}`));
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const createdProduct = await productService.Create(req.body, next);

    if (!createdProduct) return;

    return res.status(201).send({ status: 201, createdProduct });
  } catch (error: any) {
    return next(new InternalServerException(`Error createProduct controller: ${error.message}`));
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  try {

    const updatedProduct = await productService.Update(id, req.body, next);

    if (!updatedProduct) return;

    return res.status(200).send({ status: 200, message: 'Producto actualizado con éxito', updatedProduct });
  } catch (error: any) {
    return next(new InternalServerException(`Error updateProduct controller: ${error.message}`));
  }
}

export async function deleteOne(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  try {

    const removed = await productService.Delete(id, next);

    if (!removed) return;

    return res.status(200).send({ status: 200, message: 'Producto eliminado con éxito' });
  } catch (error: any) {
    return next(new InternalServerException(`Error deleteProduct controller: ${error.message}`));
  }
}
