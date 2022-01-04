import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { Router } from 'express';

import CustomersController from '../controllers/CustomersController';
import CustomerValidations from '../validations/CustomerValidations';

const customersRouter = Router();
const customerController = new CustomersController();
const customerValidations = new CustomerValidations();

customersRouter.use(isAuthenticated);

customersRouter.get('/', customerController.index);

customersRouter.post(
  '/',
  customerValidations.create(),
  customerController.create,
);

customersRouter.get(
  '/:id',
  customerValidations.show(),
  customerController.show,
);

customersRouter.put(
  '/:id',
  customerValidations.update(),
  customerController.update,
);

customersRouter.delete(
  '/:id',
  customerValidations.delete(),
  customerController.delete,
);

export default customersRouter;
