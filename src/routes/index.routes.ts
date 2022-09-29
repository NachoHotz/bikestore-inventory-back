import { Router } from 'express';

import * as controller from '../controllers/basicController.controller';
import NotFoundException from '../exceptions/NotFoundException';
import usersRouter from './users.routes';

const mainRouter = Router();

mainRouter.get('/', controller.basicController);

mainRouter.use('/users', usersRouter);

mainRouter.use('*', (_req, _res, next) =>
  next(new NotFoundException('This page does not exist')),
);

export default mainRouter;
