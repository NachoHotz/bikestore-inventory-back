import { Router } from 'express';
import { CreateCategorySchema, UpdateCategorySchema } from '../../../prisma/validations/Category';
import { validateSchema } from '../middlewares/validateSchema.middleware';
import * as controller from '../controllers/category.controller';

const categoriesRouter = Router();

categoriesRouter.get('/', controller.getAll);
categoriesRouter.get('/:id', controller.getOne);
categoriesRouter.post('/', validateSchema(CreateCategorySchema), controller.create);
categoriesRouter.put('/:id', validateSchema(UpdateCategorySchema), controller.update);
categoriesRouter.delete('/:id', controller.deleteOne);

export default categoriesRouter;
