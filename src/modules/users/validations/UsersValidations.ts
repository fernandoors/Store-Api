import { celebrate, Segments, Joi } from 'celebrate';

export default class ProductsValidations {
  public create() {
    return celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
      },
    });
  }
}
