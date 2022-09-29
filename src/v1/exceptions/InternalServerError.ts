import HttpException from './HttpException';

export default class InternalServerException extends HttpException {
  constructor(message: string) {
    super(500, message);
  }
}
