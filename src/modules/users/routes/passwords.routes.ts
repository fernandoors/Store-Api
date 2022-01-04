import { Router } from 'express';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController ';
import ForgotPasswordValidations from '../validations/ForgotPasswordValidations';
import ResetPasswordValidations from '../validations/ResetPasswordValidations';

const passwordRouter = Router();

const forgotPasswordController = new ForgotPasswordController();
const forgotPasswordValidations = new ForgotPasswordValidations();

const resetPasswordController = new ResetPasswordController();
const resetPasswordValidations = new ResetPasswordValidations();

passwordRouter.post(
  '/forgot',
  forgotPasswordValidations.create(),
  forgotPasswordController.create,
);

passwordRouter.post(
  '/reset',
  resetPasswordValidations.create(),
  resetPasswordController.create,
);
export default passwordRouter;
