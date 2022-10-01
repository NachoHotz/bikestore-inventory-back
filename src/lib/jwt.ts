import { DataStoredInToken } from '../interfaces';
import { User } from '@prisma/client';
import { jwtOptsDecode, jwtOptsSign } from '../utils/jwtOpts';

export function createToken(data: User, tokenType: string) {
  const dataStoredInToken: DataStoredInToken = {
    email: data.email
  };

  return jwtOptsSign[tokenType as keyof typeof jwtOptsSign](dataStoredInToken);
}

export function decodeToken(token: string, tokenType: string) {
  return jwtOptsDecode[tokenType as keyof typeof jwtOptsDecode](token);
}
