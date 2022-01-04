import { Router } from 'express';
import customersRouter from '@modules/customers/routes/customer.routes';
import productsRouter from '@modules/products/routes/products.routes';
import passwordRouter from '@modules/users/routes/passwords.routes';
import profileRouter from '@modules/users/routes/profile.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import usersRouter from '@modules/users/routes/users.routes';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello' });
});

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/profile', profileRouter);
routes.use('/password', passwordRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/customers', customersRouter);

export default routes;
