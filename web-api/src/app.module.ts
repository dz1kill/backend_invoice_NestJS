import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { CompanyModule } from './company/company.module';
import { InvoiceModule } from './invoice/invoice.module';
import { LogModule } from './log/log.module';

@Module({
  imports: [InvoiceModule, ClientModule, CompanyModule, LogModule],
})
export class AppModule {}
