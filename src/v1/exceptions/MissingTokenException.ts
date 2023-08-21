import { TokenType } from '../../common/enums';
import HttpException from './HttpException';

export class MissingTokenException extends HttpException {
  constructor(tokenType: TokenType, message = `No ${tokenType} token provided`) {
    super(401, message);
  }
}
