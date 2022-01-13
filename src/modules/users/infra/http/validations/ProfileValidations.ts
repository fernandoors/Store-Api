import { celebrate, Segments, Joi } from 'celebrate';

export default class ProfileValidations {
  public update() {
    return celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().optional(),
        old_password: Joi.string(),
        password_confirmation: Joi.string()
          .valid(Joi.ref('password'))
          .when('password', {
            is: Joi.exist(),
            then: Joi.required(),
          }),
      },
    });
  }
}
