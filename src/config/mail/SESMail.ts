import nodemailer from 'nodemailer';
import aws from 'aws-sdk';
import HandlebarsMailTemplate, {
  IParseMailTemplate,
} from './HandlebarsMailTemplate';
import mailConfig from './mail';

interface IMailContact {
  name: string;
  email: string;
}

interface ISendMail {
  to: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
  from?: IMailContact;
}

export default class SESMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMail): Promise<void> {
    const mailTemplate = new HandlebarsMailTemplate();
    const transporter = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2012-10-17',
      }),
    });

    const { name: defaultName, email: defaultEmail } = mailConfig.defaults.from;

    await transporter.sendMail({
      from: {
        name: from?.name || defaultName,
        address: from?.email || defaultEmail,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });
  }
}
