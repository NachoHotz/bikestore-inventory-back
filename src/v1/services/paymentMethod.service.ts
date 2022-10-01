import { PaymentMethod } from '@prisma/client';
import { NextFunction } from 'express';
import { prisma } from '../../config';
import { BadRequestException, InternalServerException } from '../exceptions';

export async function GetAll(next: NextFunction) {
  try {
    return await prisma.paymentMethod.findMany();
  } catch (error: any) {
    return next(new InternalServerException(`Error GetAllPaymentMethods service: ${error.message}`));
  }
}

export async function Create(paymentMethodInfo: PaymentMethod, next: NextFunction) {
  try {
    const paymentMethodExists = await prisma.paymentMethod.findFirst({ where: { name: paymentMethodInfo.name }});

    if (paymentMethodExists) {
      return next(new BadRequestException(`Ya existe un metodo de pago con el nombre ${paymentMethodInfo.name}`));
    }

    return await prisma.paymentMethod.create({ data: paymentMethodInfo });
  } catch (error: any) {
    return next(new InternalServerException(`Error CreatePaymentMethod service: ${error.message}`));
  }
}
