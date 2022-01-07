import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { Router } from 'express';

import ProductsController from '../controllers/ProductsController';
import ProductsValidations from '../validations/ProductsValidations';

const productsRouter = Router();
const productsController = new ProductsController();
const productsValidations = new ProductsValidations();

productsRouter.get('/', productsController.index);
productsRouter.get('/:id', productsValidations.show(), productsController.show);

productsRouter.use(isAuthenticated);
productsRouter.post(
  '/',
  productsValidations.create(),
  productsController.create,
);

productsRouter.put(
  '/:id',
  productsValidations.update(),
  productsController.update,
);

productsRouter.delete(
  '/:id',
  productsValidations.delete(),
  productsController.delete,
);

export default productsRouter;
