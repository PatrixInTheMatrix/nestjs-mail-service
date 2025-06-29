import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';
import { IsEmail, IsNotEmpty } from 'class-validator';

class ContactFormDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  message: string;
}

@Controller('contact')
export class ContactController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  async sendMail(@Body() form: ContactFormDto) {
    await this.mailService.sendMail(form);
    return { success: true };
  }
}
