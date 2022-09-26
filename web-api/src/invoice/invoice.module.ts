import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from '../common/entity/Clients';
import { Company } from '../common/entity/Companies';
import { Log } from '../common/entity/Logs';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { dbConfig, redisConfig } from '../data-source';
import { BullModule } from '@nestjs/bull';
import { HelperInvoice } from './helper';

@Module({
  controllers: [InvoiceController],
  providers: [InvoiceService, HelperInvoice],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Client, Log, Company]),
    TypeOrmModule.forRoot(dbConfig),
    BullModule.forRoot({ redis: redisConfig }),
    BullModule.registerQueue({
      name: 'Invoice',
    }),
  ],
})
export class InvoiceModule {}
