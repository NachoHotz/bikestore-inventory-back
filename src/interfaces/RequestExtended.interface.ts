import { User } from '@prisma/client';
import {Request} from 'express';

export interface RequestExtended extends Request {
  user?: User
}
