import { NestFactory } from '@nestjs/core';
import { PdfModule } from './pdf.module';

async function start() {
  await NestFactory.createApplicationContext(PdfModule);
}
start();
