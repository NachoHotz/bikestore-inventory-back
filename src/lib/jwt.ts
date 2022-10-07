import { DataStoredInToken } from '../interfaces';
import { User } from '@prisma/client';
import { jwtOptsDecode, jwtOptsSign } from '../utils/jwtOpts';
import { TokenType } from '../config';

export function createToken(data: User, tokenType: TokenType) {
  const dataStoredInToken: DataStoredInToken = {
    email: data.email
  };

  return jwtOptsSign[tokenType as keyof typeof jwtOptsSign](dataStoredInToken);
}

export function decodeToken(token: string, tokenType: TokenType) {
  return jwtOptsDecode[tokenType as keyof typeof jwtOptsDecode](token);
}
