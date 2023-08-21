import { TokenType } from '../../common/enums';
import HttpException from './HttpException';

export class InvalidTokenException extends HttpException {
  constructor(tokenType: TokenType, message = `Invalid ${tokenType} token`) {
    super(401, message);
  }
}
