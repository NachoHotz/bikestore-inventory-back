import { Router } from 'express';
import { CreateSaleSchema } from '../../../prisma/validations/Sale';
import * as controller from '../controllers/sale.controller';
import { validateSchema } from '../middlewares/validateSchema.middleware';

const salesRouter = Router();

salesRouter.get('/', controller.getAll);
salesRouter.post('/', validateSchema(CreateSaleSchema), controller.create);

export default salesRouter;
