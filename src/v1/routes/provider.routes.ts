import { Router } from 'express';
import { CreateProviderSchema } from '../../../prisma/validations/Provider';
import * as controller from '../controllers/provider.controller';
import { validateSchema } from '../middlewares/validateSchema.middleware';

const providersRouter = Router();

providersRouter.get('/', controller.getAll);
providersRouter.get('/:id', controller.getOne);
providersRouter.post('/', validateSchema(CreateProviderSchema), controller.create);

export default providersRouter;
