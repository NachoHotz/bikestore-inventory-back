import jwt from 'jsonwebtoken';
import { envConfig } from '../config';
import { DataStoredInToken } from '../interfaces';

const { JWT_ACCESS_TOKEN_SECRET, JWT_ACCESS_TOKEN_EXP, JWT_REFRESH_TOKEN_SECRET, JWT_REFRESH_TOKEN_EXP } = envConfig;

export const jwtOptsSign = {
  session(dataStoredInToken: DataStoredInToken) {
    return jwt.sign(dataStoredInToken, JWT_ACCESS_TOKEN_SECRET, { expiresIn: JWT_ACCESS_TOKEN_EXP });
  },
  refresh(dataStoredInToken: DataStoredInToken) {
    return jwt.sign(dataStoredInToken, JWT_REFRESH_TOKEN_SECRET, { expiresIn: JWT_REFRESH_TOKEN_EXP });
  }
};

export const jwtOptsDecode = {
  session(token: string) {
    return jwt.verify(token, JWT_ACCESS_TOKEN_SECRET) as DataStoredInToken;
  },
  refresh(token: string) {
    return jwt.verify(token, JWT_REFRESH_TOKEN_SECRET) as DataStoredInToken;
  }
};
