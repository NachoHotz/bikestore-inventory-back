import { NextFunction } from 'express';
import { prisma } from '../../config';
import InternalServerException from '../exceptions/InternalServerError';

export async function GetUsers(next: NextFunction) {
  try {
    return await prisma.user.findMany();
  } catch (error: any) {
    return next(new InternalServerException(`Error GetUsers service: ${error.message}`));
  }
}
