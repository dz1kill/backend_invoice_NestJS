import { InjectQueue, OnGlobalQueueCompleted, Processor } from '@nestjs/bull';
import { ObjectForPDF, OwnerInfo } from './type';
import { sendFileToEmailJob } from './jobs/sendFile';
import { JobName } from './constants';

@Processor('Invoice')
export class InvoiceSend {
  constructor(@InjectQueue('Invoice') private queue) {}
  @OnGlobalQueueCompleted()
  async onGlobalCompleted(jobId: number) {
    const job = await this.queue.getJob(jobId);

    if (job.name === JobName.GenerateAndSendInvoice) {
      const { email, firstName }: OwnerInfo = job.data.ownerInfo;
      const { sendEmail, clientEmail }: ObjectForPDF = job.data.objectForPDF;
      console.log(`Processing job ${job.id} of type ${job.name}.`);

      await sendFileToEmailJob(
        sendEmail,
        clientEmail,
        firstName,
        email,
        job.returnvalue,
        job.data.file,
      );
    }
  }
}
