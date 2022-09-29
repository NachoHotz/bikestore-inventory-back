import { NextFunction } from 'express';
import { AppDataStore } from '../db/connection';
import { User } from '../db/entities/User.entity';
import InternalServerException from '../exceptions/InternalServerError';

const userRepository = AppDataStore.getRepository(User);

export async function GetUsers(next: NextFunction) {
  try {
    return await userRepository.find();
  } catch (error: any) {
    return next(new InternalServerException(`Error GetUsers service: ${error.message}`));
  }
}
