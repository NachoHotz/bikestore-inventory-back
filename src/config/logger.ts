import winston from 'winston';
import { NodeEnvs } from './constants';
import { envConfig } from './env';

const { NODE_ENV } = envConfig;

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (NODE_ENV !== NodeEnvs.production) {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}
