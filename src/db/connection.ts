import { envConfig } from '../config';

const {
  DB_HOST,
  DB_NAME,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DIALECT,
  NODE_ENV,
} = envConfig;

import { DataSource } from 'typeorm';

export const AppDataStore = new DataSource({
  type: DB_DIALECT as any,
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: NODE_ENV === 'development',
  logging: false,
  entities: [__dirname + '/entities/*.entity.ts'],
});
