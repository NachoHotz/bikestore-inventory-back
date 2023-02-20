import { Router } from 'express';
import { CreateOrderSchema, UpdateOrderSchema } from '../../../prisma/validations/Sale';
import { validateSchema } from '../middlewares/validateSchema.middleware';
import * as controller from '../controllers/order.controller';

const ordersRouter = Router();

ordersRouter.get('/', controller.getAll);
ordersRouter.post('/', validateSchema(CreateOrderSchema), controller.create);
ordersRouter.put('/:id', validateSchema(UpdateOrderSchema), controller.update);
ordersRouter.delete('/:id', controller.deleteOne);

export default ordersRouter;
