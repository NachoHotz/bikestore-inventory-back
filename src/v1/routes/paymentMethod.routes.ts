import { Router } from 'express';
import { CreatePaymentMethodSchema, UpdatePaymentMethodSchema } from '../../../prisma/validations/PaymentMethod';
import { validateSchema } from '../middlewares/validateSchema.middleware';
import * as controller from '../controllers/paymentMethod.controller';

const paymentMethodsRouter = Router();

paymentMethodsRouter.get('/', controller.getAll);
paymentMethodsRouter.post('/', validateSchema(CreatePaymentMethodSchema), controller.create);
paymentMethodsRouter.put('/:id', validateSchema(UpdatePaymentMethodSchema), controller.update);
paymentMethodsRouter.delete('/:id', controller.deleteOne);

export default paymentMethodsRouter;
