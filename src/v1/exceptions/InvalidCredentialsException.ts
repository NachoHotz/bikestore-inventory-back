import HttpException from './HttpException';

export class InvalidCredentialsException extends HttpException {
  constructor(message = 'Invalid email or password') {
    super(400, message);
  }
}
