import HttpException from './HttpException';

export class InvalidAccessToken extends HttpException {
  constructor(message = 'Invalid access token') {
    super(401, message);
  }
}
