import * as jwt from 'jsonwebtoken';
import { DataStoredInToken } from '../interfaces';
import { User } from '@prisma/client';
import { TokenType } from '../enums';
import { JwtTokenConfig } from '../constants';

export function createToken(data: User, tokenType: TokenType): string {
  const dataStoredInToken: DataStoredInToken = {
    email: data.email
  };

  const jwtConf = JwtTokenConfig[tokenType];

  return jwt.sign(dataStoredInToken, jwtConf.secret, { expiresIn: jwtConf.exp });
}

export function decodeToken(token: string, tokenType: TokenType): DataStoredInToken {
  return jwt.verify(token, JwtTokenConfig[tokenType].secret) as DataStoredInToken;
}
