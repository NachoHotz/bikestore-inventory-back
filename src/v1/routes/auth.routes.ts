import { Router } from 'express';
import { LoginUserSchema, SignUpUserSchema } from '../../../prisma/validations/User';
import { validateSchema } from '../middlewares/validateSchema.middleware';
import * as controller from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post('/login', validateSchema(LoginUserSchema), controller.login);
authRouter.post('/signUp', validateSchema(SignUpUserSchema), controller.signUp);

export default authRouter;
