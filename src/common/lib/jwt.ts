import { DataStoredInToken } from '../interfaces';
import { User } from '@prisma/client';
import { jwtDecodeOpts, jwtSignOpts } from '../utils/jwtOpts';
import { TokenType } from '../config';

export function createToken(data: User, tokenType: TokenType) {
  const dataStoredInToken: DataStoredInToken = {
    email: data.email
  };

  return jwtSignOpts[tokenType as keyof typeof jwtSignOpts](dataStoredInToken);
}

export function decodeToken(token: string, tokenType: TokenType) {
  return jwtDecodeOpts[tokenType as keyof typeof jwtDecodeOpts](token);
}
