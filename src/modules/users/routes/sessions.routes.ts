import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';
import SessionsValidations from '../validations/SessionsValidations';

const sessionsRouter = Router();
const sessionsController = new SessionsController();
const sessionsValidations = new SessionsValidations();

sessionsRouter.post(
  '/',
  sessionsValidations.create(),
  sessionsController.create,
);

export default sessionsRouter;
