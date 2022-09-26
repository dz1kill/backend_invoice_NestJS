import { NestFactory } from '@nestjs/core';
import { sendEmailModule } from './mailer.module';
async function start() {
  await NestFactory.createApplicationContext(sendEmailModule);
}
start();
