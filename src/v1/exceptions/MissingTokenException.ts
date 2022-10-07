import HttpException from './HttpException';
import { TokenType } from '../../config';

export class MissingTokenException extends HttpException {
  constructor(tokenType: TokenType, message = `No ${tokenType} token provided`) {
    super(401, message);
  }
}
