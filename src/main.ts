import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import * as express from 'express';
import { AppModule } from './app.module';

/**
 * Bootstrap API initialization
 */
async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule, { bodyParser: true });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('NestJS example')
    .setDescription('The NextJS API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-ui', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
