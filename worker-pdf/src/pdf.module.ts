import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InvoiceGenerate } from '.';
import * as config from 'config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: config.get('redisConfig.host'),
        port: config.get('redisConfig.port'),
        password: config.get('redisConfig.password'),
        database: config.get('redisConfig.database'),
      },
    }),

    BullModule.registerQueue({
      name: 'Invoice',
    }),
  ],
  controllers: [],
  providers: [InvoiceGenerate],
})
export class PdfModule {}
