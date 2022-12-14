import { Product } from '@prisma/client';
import { NextFunction } from 'express';
import { prisma } from '../../common/config';
import { IQuery } from '../../common/interfaces';
import { BadRequestException, InternalServerException, NotFoundException } from '../exceptions';

export async function GetAll(next: NextFunction) {
  try {
    return await prisma.product.findMany({
      include: {
        category: true,
        provider: true
      }
    });
  } catch (error: any) {
    return next(new InternalServerException(`Error GetAllProducts service: ${error.message}`));
  }
}

export async function GetByQuery(query: Partial<IQuery>, next: NextFunction) {
  try {
    return await prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query.q,
              mode: 'insensitive'
            }
          },
          {
            description: {
              contains: query.q,
              mode: 'insensitive'
            }
          },
          {
            category: {
              name: {
                in: query.category,
                mode: 'insensitive'
              }
            },
          },
          {
            provider: {
              name: {
                in: query.provider,
                mode: 'insensitive'
              },
            },
          }
        ],
      },
      include: {
        category: true,
        provider: true
      }
    });
  } catch (error: any) {
    return next(new InternalServerException(`Error GetByQuery service: ${error.message}`));
  }
}

export async function GetById(id: string, next: NextFunction) {
  try {
    return await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        provider: true
      }
    });
  } catch (error: any) {
    return next(new InternalServerException(`Error GetOneProducts service: ${error.message}`));
  }
}

export async function Create(productInfo: Product, next: NextFunction) {
  try {
    const productExists = await prisma.product.findUnique({ where: { id: productInfo.id } });

    if (productExists) {
      return next(new BadRequestException(`Ya existe un producto con el c??digo ${productInfo.id}`));
    }

    return await prisma.product.create({ data: productInfo });
  } catch (error: any) {
    return next(new InternalServerException(`Error CreateProduct service: ${error.message}`));
  }
}

export async function Update(id: string, productInfo: Partial<Product>, next: NextFunction) {
  try {
    const productExists = await prisma.product.findFirst({ where: { id } });

    if (!productExists) {
      return next(new NotFoundException(`Producto no encontrado con el c??digo ${id}`));
    }

    return await prisma.product.update({
      where: { id },
      data: productInfo,
      include: {
        category: true,
        provider: true
      }
    });
  } catch (error: any) {
    return next(new InternalServerException(`Error UpdateProduct service: ${error.message}`));
  }
}

export async function Delete(id: string, next: NextFunction) {
  try {
    const productExists = await prisma.product.findUnique({ where: { id } });

    if (!productExists) {
      return next(new NotFoundException('No se encontro el producto solicitado. Posiblemente ya ha sido eliminado'));
    }

    return await prisma.product.delete({ where: { id } });
  } catch (error: any) {
    return next(new InternalServerException(`Error DeleteProduct service: ${error.message}`));
  }
}
