import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InvoiceSend } from '.';
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
  providers: [InvoiceSend],
})
export class sendEmailModule {}
