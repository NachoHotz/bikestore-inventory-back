import { Order } from '@prisma/client';
import { NextFunction } from 'express';
import { prisma } from '../../common/config';
import { BadRequestException, InternalServerException } from '../exceptions';

export async function GetAll(next: NextFunction) {
  try {
    const orders = await prisma.order.findMany({
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

export async function Create(newSaleInfo: Order, products: string[], next: NextFunction) {
  try {
    const createdOrder = await prisma.order.create({
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

    await prisma.productsOnOrder.createMany({ data: ordersWithProducts });

    return await prisma.order.findUnique({
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

export async function Update(id: number, newOrderInfo: Order, next: NextFunction) {
  try {
    const orderExists = await prisma.order.findUnique({ where: { id } });

    if (!orderExists) {
      return next(new BadRequestException('No no se encontro la venta solicitada'));
    }

    return await prisma.order.update({
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
    const orderExists = await prisma.order.findUnique({ where: { id } });

    if (!orderExists) {
      return next(new BadRequestException('No se encontro la venta solicitada. Posiblemente ya ha sido eliminada'));
    }

    return await prisma.order.delete({ where: { id } });
  } catch (error: any) {
    return next(new InternalServerException(`Error DeleteOrder service: ${error.message}`));
  }
}
