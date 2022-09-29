import { Router } from 'express';
import *  as controller from '../controllers/user.controller';

const usersRouter = Router();

usersRouter.get('/', controller.getUsers);

export default usersRouter;
