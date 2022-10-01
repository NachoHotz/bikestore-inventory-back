import HttpException from './HttpException';

export class InvalidToken extends HttpException {
  constructor(tokenType: string, message = `Invalid ${tokenType} token`) {
    super(401, message);
  }
}
