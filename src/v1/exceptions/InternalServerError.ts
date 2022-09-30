import HttpException from './HttpException';

export class InternalServerException extends HttpException {
  constructor(message: string) {
    super(500, message);
  }
}
