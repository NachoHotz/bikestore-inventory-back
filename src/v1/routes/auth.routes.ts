import { Router } from 'express';
import { LoginUserSchema, SignUpUserSchema } from '../../../prisma/validations/User';
import { validateSchema } from '../middlewares/validateSchema.middleware';
import * as controller from '../controllers/auth.controller';
import * as authMiddleware from '../middlewares/auth.middleware';

const authRouter = Router();

authRouter.post('/login', validateSchema(LoginUserSchema), controller.login);
authRouter.post('/signup', validateSchema(SignUpUserSchema), controller.signUp);
authRouter.post('/logout', controller.logOut);
authRouter.post('/token', authMiddleware.verifyRefreshToken, controller.refreshSessionToken);

export default authRouter;
