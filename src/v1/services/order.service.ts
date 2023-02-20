import { Sale } from '@prisma/client';
import { NextFunction } from 'express';
import { prisma } from '../../common/config';
import { BadRequestException, InternalServerException } from '../exceptions';

export async function GetAll(next: NextFunction) {
  try {
    const orders = await prisma.sale.findMany({
      include: {
        products: {
          include: {
            product: true
          }
        },
        paymentMethod: true,
      }
    });

    return orders.map((order) => {
      return {
        ...order,
        products: order.products.map((p) => p.product) // returns the acutal product info
      };
    });
  } catch (error: any) {
    return next(new InternalServerException(`Error GetAllOrders service: ${error.message}`));
  }
}

export async function Create(newSaleInfo: Sale, products: string[], next: NextFunction) {
  try {
    const createdOrder = await prisma.sale.create({
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

    const ordersWithProducts = assignedProductsArray.map((product) => {
      return { orderId: createdOrder.id, productId: product };
    });

    await prisma.productsOnSale.createMany({ data: ordersWithProducts });

    return await prisma.sale.findUnique({
      where: {
        id: createdOrder.id
      },
      include: {
        products: {
          include: {
            product: true
          }
        },
        paymentMethod: true
      }
    });
  } catch (error: any) {
    return next(new InternalServerException(`Error CreateOrder service: ${error.message}`));
  }
}

export async function Update(id: number, newOrderInfo: Sale, next: NextFunction) {
  try {
    const orderExists = await prisma.sale.findUnique({ where: { id } });

    if (!orderExists) {
      return next(new BadRequestException('No no se encontro la venta solicitada'));
    }

    return await prisma.sale.update({
      where: { id },
      data: newOrderInfo,
      include: {
        paymentMethod: true, products: {
          include: {
            product: true
          }
        }
      }
    });
  } catch (error: any) {
    return next(new InternalServerException(`Error UpdateOrder service: ${error.message}`));
  }
}

export async function Delete(id: number, next: NextFunction) {
  try {
    const orderExists = await prisma.sale.findUnique({ where: { id } });

    if (!orderExists) {
      return next(new BadRequestException('No se encontro la venta solicitada. Posiblemente ya ha sido eliminada'));
    }

    return await prisma.sale.delete({ where: { id } });
  } catch (error: any) {
    return next(new InternalServerException(`Error DeleteOrder service: ${error.message}`));
  }
}
