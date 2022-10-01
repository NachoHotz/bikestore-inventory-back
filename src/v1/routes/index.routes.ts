import { Router } from 'express';

import * as controller from '../controllers/basicController.controller';

import productsRouter from './product.routes';
import providersRouter from './provider.routes';
import categoriesRouter from './category.routes';
import authRouter from './auth.routes';

import { NotFoundException } from '../exceptions';

const mainRouter = Router();

mainRouter.get('/', controller.basicController);

mainRouter.use('/auth', authRouter);
mainRouter.use('/products', productsRouter);
mainRouter.use('/providers', providersRouter);
mainRouter.use('/categories', categoriesRouter);

mainRouter.use('*', (_req, _res, next) =>
  next(new NotFoundException('This route does not exist')),
);

export default mainRouter;
