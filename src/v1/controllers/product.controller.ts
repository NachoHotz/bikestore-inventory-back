import { Product } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { IQuery } from '../../common/interfaces';
import { InternalServerException, NotFoundException } from '../exceptions';
import { BaseResponse } from '../types/responses/baseResponse';
import * as productService from '../services/product.service';

export async function getAll(req: Request, res: Response<BaseResponse<Product[]>>, next: NextFunction) {
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
    const allProducts = await productService.GetAll(next, query);

    if (!allProducts || allProducts.length === 0) {
      return next(new NotFoundException('No se encontraron productos'));
    }

    return res.status(200).send({ status: 200, data: allProducts });
  } catch (error: any) {
    return next(new InternalServerException(`Error getAllProducts controller: ${error.message}`));
  }
}

export async function getById(req: Request, res: Response<BaseResponse<Product>>, next: NextFunction) {
  const { id } = req.params;

  try {

    const uniqueProduct = await productService.GetById(id, next);

    if (!uniqueProduct) {
      return next(new NotFoundException('No se encontro el producto solicitado'));
    }

    return res.status(200).send({ status: 200, data: uniqueProduct });
  } catch (error: any) {
    return next(new InternalServerException(`Error getOneProducts controller: ${error.message}`));
  }
}

export async function create(req: Request, res: Response<BaseResponse<Product>>, next: NextFunction) {
  try {
    const createdProduct = await productService.Create(req.body, next);

    if (!createdProduct) return;

    return res.status(201).send({ status: 201, message: 'Producto creado con exito', data: createdProduct });
  } catch (error: any) {
    return next(new InternalServerException(`Error createProduct controller: ${error.message}`));
  }
}

export async function update(req: Request, res: Response<BaseResponse<Product>>, next: NextFunction) {
  const { id } = req.params;

  try {

    const updatedProduct = await productService.Update(id, req.body, next);

    if (!updatedProduct) return;

    return res.status(200).send({ status: 200, message: 'Producto actualizado con éxito', data: updatedProduct });
  } catch (error: any) {
    return next(new InternalServerException(`Error updateProduct controller: ${error.message}`));
  }
}

export async function deleteOne(req: Request, res: Response<BaseResponse<Product>>, next: NextFunction) {
  const { id } = req.params;

  try {

    const deletedProduct = await productService.Delete(id, next);

    if (!deletedProduct) return;

    return res.status(200).send({ status: 200, message: 'Producto eliminado con éxito', data: deletedProduct });
  } catch (error: any) {
    return next(new InternalServerException(`Error deleteProduct controller: ${error.message}`));
  }
}
