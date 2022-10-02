import { NextFunction } from 'express';
import { Provider } from '@prisma/client';
import { prisma } from '../../config';
import { BadRequestException, InternalServerException, NotFoundException } from '../exceptions';

export async function GetAll(next: NextFunction) {
  try {
    return await prisma.provider.findMany();
  } catch (error: any) {
    return next(new InternalServerException(`Error GetAllProviders service: ${error.message}`));
  }
}

export async function GetOne(id: number, next: NextFunction) {
  try {
    return await prisma.provider.findUnique({ where: { id } });
  } catch (error: any) {
    return next(new InternalServerException(`Error GetOneProvider service: ${error.message}`));
  }
}

export async function Create(providerInfo: Provider, next: NextFunction) {
  try {
    const providerExists = await prisma.provider.findFirst({ where: { email: providerInfo.email } });

    if (providerExists) {
      return next(new BadRequestException(`Ya existe un proveedor con el email ${providerInfo.email}`));
    }

    return await prisma.provider.create({ data: providerInfo });
  } catch (error: any) {
    return next(new InternalServerException(`Error CreateProvider service: ${error.message}`));
  }
}

export async function Update(id: number, providerInfo: Provider, next: NextFunction) {
  try {
    const providerExists = await prisma.provider.findUnique({ where: { id } });

    if (!providerExists) {
      return next(new NotFoundException('No se econtro el proveedor solicitado'));
    }

    return await prisma.provider.update({ where: { id }, data: providerInfo });
  } catch (error: any) {
    return next(new InternalServerException(`Error UpdateProvider service: ${error.message}`));
  }
}

export async function Delete(id: number, next: NextFunction) {
  try {
    const providerExists = await prisma.provider.findUnique({ where: { id } });

    if (!providerExists) {
      return next(new NotFoundException('No se encontro el proveedor solicitado. Posiblemente ya ha sido eliminado'));
    }

    return await prisma.provider.delete({ where: { id } });
  } catch (error: any) {
    return next(new InternalServerException(`Error DeleteProvider service: ${error.message}`));
  }
}
