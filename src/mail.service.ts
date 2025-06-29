import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    host: 'smtp.your-mailserver.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  async sendMail(data: { name: string; email: string; message: string }) {
    await this.transporter.sendMail({
      from: '"DiWiDi Kontakt" <your@email.com>',
      to: 'business@diwidi.net',
      subject: `Neue Nachricht von ${data.name}`,
      html: `
        <h3>Kontaktformular</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Nachricht:</strong><br/>${data.message}</p>
      `,
    });
  }
}
