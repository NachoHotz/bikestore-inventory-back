import HttpException from './HttpException';

export default class ForbiddenException extends HttpException {
  constructor(
    message = 'You do not have the necessary permissions to execute this action',
  ) {
    super(403, message);
  }
}
