import { prisma } from '../../config';
import { NextFunction } from 'express';
import { BadRequestException, InternalServerException } from '../exceptions';
import { Category } from '@prisma/client';

export async function GetAll(next: NextFunction) {
  try {
    return await prisma.category.findMany();
  } catch (error: any) {
    return next(new InternalServerException(`Error GetAllCategories service: ${error.message}`));
  }
}

export async function GetOne(id: number, next: NextFunction) {
  try {
    return await prisma.category.findUnique({ where: { id } });
  } catch (error: any) {
    return next(new InternalServerException(`Error GetOneCategory service: ${error.message}`));
  }
}

export async function Create(newCategoryInfo: Category, next: NextFunction) {
  try {
    const categoryExists = await prisma.category.findFirst({ where: { name: newCategoryInfo.name } });

    if (categoryExists) {
      return next(new BadRequestException(`Ya existe una categoria con el nombre ${newCategoryInfo.name}`));
    }

    return await prisma.category.create({ data: newCategoryInfo });
  } catch (error: any) {
    return next(new InternalServerException(`Error CreateCategory service: ${error.message}`));
  }
}

export async function Update(id: number, categoryInfo: Category, next: NextFunction) {
  try {
    const categoryExists = await prisma.category.findUnique({ where: { id } });

    if (!categoryExists) {
      return next(new BadRequestException(`No se encontro la categoria con el código ${id}`));
    }

    return await prisma.category.update({ where: { id }, data: categoryInfo });
  } catch (error: any) {
    return next(new InternalServerException(`Error UpdateCategory service: ${error.message}`));
  }
}

export async function Delete(id: number, next: NextFunction) {
  try {
    const categoryExists = await prisma.category.findUnique({ where: { id } });

    if (!categoryExists) {
      return next(new BadRequestException('No se encontro la categoria solicitada. Posiblemente ya ha sido eliminada'));
    }

    return await prisma.category.delete({ where: { id } });
  } catch (error: any) {
    return next(new InternalServerException(`Error DeleteCategory service: ${error.message}`));
  }
}
