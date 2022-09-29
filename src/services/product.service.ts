import { NextFunction } from 'express';
import { prisma } from '../config';
import InternalServerException from '../exceptions/InternalServerError';

export async function GetAllProducts(next: NextFunction) {
  try {
    return await prisma.product.findMany();
  } catch (error: any) {
    return next(new InternalServerException(`Error GetAllProducts service: ${error.message}`));
  }
}
