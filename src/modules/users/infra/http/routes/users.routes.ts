import { Router } from 'express';
import multer from 'multer';

import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import uploadSettings from '@config/upload';

import UsersController from '../controllers/UsersController';
import UserValidations from '../validations/UsersValidations';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const userValidations = new UserValidations();

const upload = multer(uploadSettings.multer);

usersRouter.get('/', isAuthenticated, usersController.index);

usersRouter.post('/', userValidations.create(), usersController.create);

usersRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
