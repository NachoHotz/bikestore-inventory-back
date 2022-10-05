import HttpException from './HttpException';

export class InvalidTokenException extends HttpException {
  constructor(tokenType: string, message = `Invalid ${tokenType} token`) {
    super(401, message);
  }
}
