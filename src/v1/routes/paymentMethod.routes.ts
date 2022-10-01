import { Router } from 'express';
import { CreatePaymentMethodSchema } from '../../../prisma/validations/PaymentMethod';
import * as controller from '../controllers/paymentMethod.controller';
import { validateSchema } from '../middlewares/validateSchema.middleware';

const paymentMethodsRouter = Router();

paymentMethodsRouter.get('/', controller.getAll);
paymentMethodsRouter.post('/', validateSchema(CreatePaymentMethodSchema), controller.create);

export default paymentMethodsRouter;
