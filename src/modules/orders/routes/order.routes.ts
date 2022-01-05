import { Router } from 'express';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import OrderController from '../controllers/OrderControllers';
import OrdersValidations from '../validations/OrdersValidations';

const orderRouter = Router();
const orderController = new OrderController();
const orderValidations = new OrdersValidations();

orderRouter.use(isAuthenticated);

orderRouter.get('/:id', orderController.show);
orderRouter.post('/', orderValidations.create(), orderController.create);

export default orderRouter;
