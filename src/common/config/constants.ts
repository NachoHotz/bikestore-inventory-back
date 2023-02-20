import { envConfig } from './env'

const { SERVER_DEV_URL, SERVER_PROD_URL } = envConfig

export const SERVER_URLS = {
  development: SERVER_DEV_URL,
  production: SERVER_PROD_URL
}
