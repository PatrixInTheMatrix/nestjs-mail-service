import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'https://diwidi.net',
      'https://www.diwidi.net',
      'https://dev.diwidi.net',
      'http://localhost:4200', // optional: nur im dev
    ],
    methods: ['POST'],
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3000);
}
bootstrap();
