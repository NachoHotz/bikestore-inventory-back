import { Router } from 'express';

import * as controller from '../controllers/basicController.controller';
import productsRouter from './products.routes';
import usersRouter from './users.routes';
import { NotFoundException } from '../exceptions';

const mainRouter = Router();

mainRouter.get('/', controller.basicController);

mainRouter.use('/users', usersRouter);
mainRouter.use('/products', productsRouter);

mainRouter.use('*', (_req, _res, next) =>
  next(new NotFoundException('This route does not exist')),
);

export default mainRouter;
