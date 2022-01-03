import { Router } from 'express';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

import UsersController from '../controllers/UsersController';
import UserValidations from '../validations/UsersValidations';

const usersRouter = Router();
const usersController = new UsersController();
const userValidations = new UserValidations();

usersRouter.get('/', isAuthenticated, usersController.index);

usersRouter.post('/', userValidations.create(), usersController.create);

export default usersRouter;
