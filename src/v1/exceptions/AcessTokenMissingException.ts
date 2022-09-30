import HttpException from './HttpException';

export class AcessTokenMissingException extends HttpException {
  constructor(message = 'No access token provided') {
    super(400, message);
  }
}
