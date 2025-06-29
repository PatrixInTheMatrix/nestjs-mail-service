import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ContactFormDto } from './contact.controller';

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

  async sendMail(data: ContactFormDto): Promise<void> {
  try {
    await this.transporter.sendMail({
      from: `"DiWiDi Kontakt" <${process.env.SMTP_USER}>`,
      to: 'business@diwidi.net',
      subject: `Neue Nachricht von ${data.name}`,
      html: `
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Nachricht:</strong><br>${data.message}</p>
      `,
    });
    console.log('✅ E-Mail erfolgreich versendet');
  } catch (error) {
    console.error('❌ Fehler beim E-Mail-Versand:', error);
    throw error;
  }
}

}
