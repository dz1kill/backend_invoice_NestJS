import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { JobName } from './interface';
import { generateInvoiceJob } from './jobs/generateInvoice';

@Processor('Invoice')
export class InvoiceGenerate {
  private readonly logger = new Logger(InvoiceGenerate.name);

  @Process(JobName.GenerateAndSendInvoice)
  async handleTranscode(job: Job) {
    this.logger.debug('Start generate..');

    return generateInvoiceJob(job.data.objectForPDF, job.data.ownerInfo);
  }
}
