import HttpException from './HttpException';

export default class InvalidCredentialsException extends HttpException {
  constructor(message: string = 'Invalid email or password') {
    super(400, message);
  }
}
