import { celebrate, Segments, Joi } from 'celebrate';

export default class ProductsValidations {
  public show() {
    return celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    });
  }
  public create() {
    return celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        price: Joi.number().precision(2).required(),
        quantity: Joi.number().required(),
      },
    });
  }
  public update() {
    return celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
      [Segments.BODY]: {
        name: Joi.string().required(),
        price: Joi.number().precision(2).required(),
        quantity: Joi.number().required(),
      },
    });
  }
  public delete() {
    return celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    });
  }
}
