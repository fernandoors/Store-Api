import { celebrate, Segments, Joi } from 'celebrate';

export default class ResetPasswordValidations {
  public create() {
    return celebrate({
      [Segments.BODY]: {
        token: Joi.string().required(),
        password: Joi.string().required(),
        password_confirmation: Joi.string()
          .required()
          .valid(Joi.ref('password')),
      },
    });
  }
}
