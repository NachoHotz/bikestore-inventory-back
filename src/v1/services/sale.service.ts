import { Sale } from '@prisma/client';
import { NextFunction } from 'express';
import { prisma } from '../../config';
import { InternalServerException } from '../exceptions';

export async function GetAll(next: NextFunction) {
  try {
    const sales = await prisma.sale.findMany({ include: { products: { include: { product: true } } } });

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
