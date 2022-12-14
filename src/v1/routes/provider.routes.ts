import { Router } from 'express';
import { CreateProviderSchema } from '../../../prisma/validations/Provider';
import { UpdateProviderSchema } from '../../../prisma/validations/Provider/UpdateProvider.schema';
import { validateSchema } from '../middlewares/validateSchema.middleware';
import * as controller from '../controllers/provider.controller';

const providersRouter = Router();

providersRouter.get('/', controller.getAll);
providersRouter.get('/:id', controller.getOne);
providersRouter.post('/', validateSchema(CreateProviderSchema), controller.create);
providersRouter.put('/:id', validateSchema(UpdateProviderSchema), controller.update);
providersRouter.delete('/:id', controller.deleteOne);

export default providersRouter;
