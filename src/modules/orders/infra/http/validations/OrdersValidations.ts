import { celebrate, Segments, Joi } from 'celebrate';

export default class OrdersValidations {
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
        customer_id: Joi.string().uuid().required(),
        products: Joi.array()
          .items({
            id: Joi.string().uuid().required(),
            quantity: Joi.number().required(),
          })
          .required(),
      },
    });
  }
}
