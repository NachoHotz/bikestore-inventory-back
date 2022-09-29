import { Router } from 'express';
import * as controller from '../controllers/product.controller';

const productsRouter = Router();

productsRouter.get('/', controller.getAll);
productsRouter.post('/', controller.create);

export default productsRouter;
