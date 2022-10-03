import { Sale } from '@prisma/client';
import { NextFunction } from 'express';
import { prisma } from '../../config';
import { BadRequestException, InternalServerException } from '../exceptions';

export async function GetAll(next: NextFunction) {
  try {
    const sales = await prisma.sale.findMany({
      include: {
        products: {
          include: {
            product: true
          }
        },
        PaymentMethod: true,
      }
    });

    return sales.map((sale) => {
      return {
        ...sale,
        products: sale.products.map((p) => p.product) // returns the acutal product info
      };
    });
  } catch (error: any) {
    return next(new InternalServerException(`Error GetAllSales service: ${error.message}`));
  }
}

export async function Create(newSaleInfo: Sale, products: string[], next: NextFunction) {
  try {
    const createdSale = await prisma.sale.create({
      data: {
        amount: newSaleInfo.amount,
        paymentMethodId: newSaleInfo.paymentMethodId,
      }
    });

    const assignedProducts = await prisma.product.findMany({
      where: {
        OR: [{
          id: { in: products }
        }]
      }
    });

    const assignedProductsArray = assignedProducts.map((product) => product.id);

    const salesWithProducts = assignedProductsArray.map((product) => {
      return { saleId: createdSale.id, productId: product };
    });

    await prisma.productsOnSale.createMany({ data: salesWithProducts });

    return await prisma.sale.findUnique({
      where: {
        id: createdSale.id
      },
      include: {
        products: {
          include: {
            product: true
          }
        },
        PaymentMethod: true
      }
    });
  } catch (error: any) {
    return next(new InternalServerException(`Error CreateSale service: ${error.message}`));
  }
}

export async function Update(id: number, newSalesInfo: Sale, next: NextFunction) {
  try {
    const saleExists = await prisma.sale.findUnique({ where: { id } });

    if (!saleExists) {
      return next(new BadRequestException('No no se encontro la venta solicitada'));
    }

    return await prisma.sale.update({
      where: { id }, data: newSalesInfo, include: {
        PaymentMethod: true, products: {
          include: {
            product: true
          }
        }
      }
    });
  } catch (error: any) {
    return next(new InternalServerException(`Error UpdateSale service: ${error.message}`));
  }
}

export async function Delete(id: number, next: NextFunction) {
  try {
    const saleExists = await prisma.sale.findUnique({ where: { id } });

    if (!saleExists) {
      return next(new BadRequestException('No se encontro la venta solicitada. Posiblemente ya ha sido eliminada'));
    }

    return await prisma.sale.delete({ where: { id } });
  } catch (error: any) {
    return next(new InternalServerException(`Error DeleteSale service: ${error.message}`));
  }
}
