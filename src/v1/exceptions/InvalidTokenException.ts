import HttpException from './HttpException';
import { TokenType } from '../../common/config';

export class InvalidTokenException extends HttpException {
  constructor(tokenType: TokenType, message = `Invalid ${tokenType} token`) {
    super(401, message);
  }
}
