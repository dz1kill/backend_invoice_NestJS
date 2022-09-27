import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as config from 'config';

async function start() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const configSwagger = new DocumentBuilder()
    .setTitle('Invoice example')
    .setDescription('Service for generating invoices')
    .setVersion('1.0')
    .addTag('Development server')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);

  const PORT = config.get('app.port') || 5000;
  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
start();
