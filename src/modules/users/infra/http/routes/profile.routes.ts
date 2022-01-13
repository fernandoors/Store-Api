import { Router } from 'express';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import ProfileController from '../controllers/ProfileController';

import ProfileValidations from '../validations/ProfileValidations';

const profileRouter = Router();
const profileController = new ProfileController();
const profileValidations = new ProfileValidations();

profileRouter.use(isAuthenticated);

profileRouter.get('/', profileController.show);
profileRouter.put('/', profileValidations.update(), profileController.update);

export default profileRouter;
