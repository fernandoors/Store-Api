import { celebrate, Segments, Joi } from 'celebrate';

export default class ForgotPasswordValidations {
  public create() {
    return celebrate({
      [Segments.BODY]: {
        email: Joi.string().email().required(),
      },
    });
  }
}
