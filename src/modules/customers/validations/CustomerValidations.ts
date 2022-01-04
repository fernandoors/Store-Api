import { celebrate, Segments, Joi } from 'celebrate';

export default class CustomerValidations {
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
        email: Joi.string().required(),
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
        email: Joi.string().required(),
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
