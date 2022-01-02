import { celebrate, Segments, Joi } from 'celebrate';

export default class SessionsValidations {
  public create() {
    return celebrate({
      [Segments.BODY]: {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
    });
  }
}
