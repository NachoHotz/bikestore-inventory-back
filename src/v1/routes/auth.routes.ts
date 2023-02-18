import { Router } from 'express';
import { LoginUserSchema, SignUpUserSchema } from '../../../prisma/validations/User';
import { validateSchema } from '../middlewares/validateSchema.middleware';
import * as controller from '../controllers/auth.controller';
import * as authMiddleware from '../middlewares/auth.middleware';

const authRouter = Router();

authRouter.post('/login', validateSchema(LoginUserSchema), controller.login);
authRouter.post('/signUp', validateSchema(SignUpUserSchema), controller.signUp);
authRouter.post('/logOut', controller.logOut);
authRouter.post('/tokens', authMiddleware.verifyRefreshToken, controller.refreshAccessToken);

export default authRouter;
