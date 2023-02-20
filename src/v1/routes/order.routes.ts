import { Router } from 'express';
import { CreateOrderSchema, UpdateOrderSchema } from '../../../prisma/validations/Sale';
import { validateSchema } from '../middlewares/validateSchema.middleware';
import * as controller from '../controllers/order.controller';

const salesRouter = Router();

salesRouter.get('/', controller.getAll);
salesRouter.post('/', validateSchema(CreateOrderSchema), controller.create);
salesRouter.put('/:id', validateSchema(UpdateOrderSchema), controller.update);
salesRouter.delete('/:id', controller.deleteOne);

export default salesRouter;
