import { Router } from 'express';
import { LoginUserSchema } from '../../../prisma/validations/User';
import { SignUpUserSchema } from '../../../prisma/validations/User/SignUpUser.schema';
import * as controller from '../controllers/auth.controller';
import { validateSchema } from '../middlewares/validateSchema.middleware';

const authRouter = Router();

authRouter.post('/login', validateSchema(LoginUserSchema), controller.login);
authRouter.post('/signUp', validateSchema(SignUpUserSchema), controller.signUp);

export default authRouter;
