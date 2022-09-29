import { Product } from '@prisma/client';
import { NextFunction } from 'express';
import { prisma } from '../../config';
import BadRequestException from '../exceptions/BadRequestException';
import InternalServerException from '../exceptions/InternalServerError';

export async function GetAll(next: NextFunction) {
  try {
    return await prisma.product.findMany();
  } catch (error: any) {
    return next(new InternalServerException(`Error GetAllProducts service: ${error.message}`));
  }
}

export async function Create(productInfo: Product, next: NextFunction) {
  try {
    const productExists  = await prisma.product.findUnique({ where: { id: productInfo.id } });

    if (productExists) {
      return next(new BadRequestException(`There is already a product with the id ${productInfo.id}`));
    }

    return await prisma.product.create({ data: productInfo });
  } catch (error: any) {
    return next(new InternalServerException(`Error CreateProduct service: ${error.message}`));
  }
}
