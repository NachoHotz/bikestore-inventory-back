import HttpException from './HttpException';

export class BadRequestException extends HttpException {
  constructor(message: string | string[]) {
    super(400, message as string);
  }
}
