import { Router } from 'express';
import { CreateSaleSchema, UpdateSaleSchema } from '../../../prisma/validations/Sale';
import * as controller from '../controllers/sale.controller';
import { validateSchema } from '../middlewares/validateSchema.middleware';

const salesRouter = Router();

salesRouter.get('/', controller.getAll);
salesRouter.post('/', validateSchema(CreateSaleSchema), controller.create);
salesRouter.put('/:id', validateSchema(UpdateSaleSchema), controller.update);
salesRouter.delete('/:id', controller.deleteOne);

export default salesRouter;
