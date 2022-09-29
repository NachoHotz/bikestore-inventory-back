import { Router } from 'express';
import * as controller from '../controllers/product.controller';
import { validateSchema } from '../middlewares/validateSchema.middleware';
import { CreateProductSchema, UpdateProductSchema  } from '../../../prisma/validations/Product';

const productsRouter = Router();

productsRouter.get('/', controller.getAll);
productsRouter.post('/', validateSchema(CreateProductSchema), controller.create);
productsRouter.put('/:id', validateSchema(UpdateProductSchema), controller.update);
productsRouter.delete('/:id', controller.deleteOne);

export default productsRouter;
