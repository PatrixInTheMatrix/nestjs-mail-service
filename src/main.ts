import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'https://diwidi.net',
      'https://www.diwidi.net',
      'https://dev.diwidi.net',
      'http://localhost:4200',
    ],
    methods: ['POST'],
  });

  app.use(
    rateLimit({
      windowMs: 60 * 1000, // 1 Minute
      max: 5, // max. 5 Anfragen pro IP/Minute
      message: 'Zu viele Anfragen – bitte später erneut versuchen.',
    })
  );

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3000);
}
bootstrap();