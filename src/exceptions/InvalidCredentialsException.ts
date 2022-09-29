import HttpException from './HttpException';

export default class InvalidCredentialsException extends HttpException {
  constructor(message = 'Invalid email or password') {
    super(400, message);
  }
}
