import EtherealMail from '@config/mail/EtherealMail';
import SESMail from '@config/mail/SESMail';
import mailConfig from '@config/mail/mail';
import path from 'path';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import urls from '@config/urls';

interface IRequest {
  email: string;
}

export default class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('This e-mail address does not exists');
    }

    const { token } = await userTokensRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    const mailTemplateData = {
      to: { email, name: user.name },
      subject: 'Reset Password',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          link: `${urls.appWebUrl}/reset-password?token=${token}`,
          name: user.name,
        },
      },
    };

    if (mailConfig.driver === 'ses') {
      await SESMail.sendMail(mailTemplateData);
    } else {
      await EtherealMail.sendMail(mailTemplateData);
    }
  }
}
