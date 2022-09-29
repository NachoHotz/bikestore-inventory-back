import { Router } from 'express';
import * as controller from '../controllers/product.controller';
import { validateSchema } from '../middlewares/validateSchema.middleware';
import { ProductSchema } from '../../../prisma/validations/Product.schema';

const productsRouter = Router();

productsRouter.get('/', controller.getAll);
productsRouter.post('/', validateSchema(ProductSchema), controller.create);

export default productsRouter;
