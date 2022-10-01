import jwt from 'jsonwebtoken';
import { envConfig } from '../config';
import { DataStoredInToken } from '../interfaces';

const { JWT_ACCESS_TOKEN_SECRET, JWT_ACCESS_TOKEN_EXP, JWT_REFRESH_TOKEN_SECRET, JWT_REFRESH_TOKEN_EXP } = envConfig;

export const jwtOptsSign = {
  access(dataStoredInToken: DataStoredInToken) {
    return jwt.sign(dataStoredInToken, JWT_ACCESS_TOKEN_SECRET, { expiresIn: JWT_REFRESH_TOKEN_EXP });
  },
  refresh(dataStoredInToken: DataStoredInToken) {
    return jwt.sign(dataStoredInToken, JWT_REFRESH_TOKEN_SECRET, { expiresIn: JWT_REFRESH_TOKEN_EXP });
  }
};
