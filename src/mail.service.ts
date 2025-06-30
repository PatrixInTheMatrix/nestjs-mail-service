import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ContactFormDto } from './contact.controller';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    host: 'web6.alfahosting-server.de', // Dein SMTP-Server
    port: 465,                          // SSL/TLS-Port für SMTP
    secure: true,                       // true bei Port 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  async sendMail(data: ContactFormDto): Promise<void> {
    try {
      const info = await this.transporter.sendMail({
        from: `"DiWiDi Kontaktformular" <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_USER,
        subject: `Neue Nachricht von ${data.name}`,
        html: `
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Nachricht:</strong><br>${data.message}</p>
        `,
      });
      console.log('✅ Mail erfolgreich gesendet:', info.messageId);
    } catch (error) {
      console.error('❌ Fehler beim Mailversand:', error);
      throw error;
    }
  }
}
