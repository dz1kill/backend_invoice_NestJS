import { ConfigModule } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as config from 'config';
ConfigModule.forRoot();
export const transporter = async (ownerEmail: string) => {
  try {
    return await nodemailer.createTransport({
      host: config.get('mailer.host'),
      port: config.get('mailer.port'),
      secure: false,
      auth: {
        user: `${ownerEmail}`,
        pass: config.get('mailer.passwordEmail'),
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};
