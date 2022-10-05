import HttpException from './HttpException';

export class MissingTokenException extends HttpException {
  constructor(tokenType: string, message = `No ${tokenType} token provided`) {
    super(401, message);
  }
}
