import { Router } from 'express';
import * as controller from '../controllers/product.controller';

const productsRouter = Router();

productsRouter.get('/', controller.getAllProducts);

export default productsRouter;
