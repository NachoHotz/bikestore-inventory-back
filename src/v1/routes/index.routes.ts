import { Router } from 'express';
import { NotFoundException } from '../exceptions';

import productsRouter from './product.routes';
import providersRouter from './provider.routes';
import categoriesRouter from './category.routes';
import paymentMethodsRouter from './paymentMethod.routes';
import salesRouter from './sale.routes';
import authRouter from './auth.routes';

import * as controller from '../controllers/rootController.controller';
import * as authMiddleware from '../middlewares/auth.middleware';

const mainRouter = Router();

mainRouter.get('/', controller.rootController);

mainRouter.use('/auth', authRouter);

mainRouter.use(authMiddleware.verifyAcessJwt);
mainRouter.use('/products', productsRouter);
mainRouter.use('/providers', providersRouter);
mainRouter.use('/payMethods', paymentMethodsRouter);
mainRouter.use('/categories', categoriesRouter);
mainRouter.use('/sales', salesRouter);

mainRouter.use('*', (_req, _res, next) =>
  next(new NotFoundException('This route does not exist')),
);

export default mainRouter;
