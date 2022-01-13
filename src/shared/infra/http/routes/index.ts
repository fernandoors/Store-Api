import { Router } from 'express';
import customersRouter from '@modules/customers/infra/http/routes/customer.routes';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import passwordRouter from '@modules/users/infra/http/routes/passwords.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import orderRouter from '@modules/orders/infra/http/routes/order.routes';

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
routes.use('/orders', orderRouter);

export default routes;
