import { InjectQueue } from '@nestjs/bull';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { ownerInfo } from '../common/data/constants';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Client } from '../common/entity/Clients';
import { Log } from '../common/entity/Logs';
import { Task } from './dto/invoice-request.dto';
import { HelperInvoice } from './helper';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Client)
    private readonly clients: Repository<Client>,
    @InjectRepository(Log)
    private log: Repository<Log>,
    @InjectQueue('Invoice') private invoiceQueue: Queue,
    private readonly helper: HelperInvoice,
  ) {}

  async generate(
    file: File[],
    clientEmail: string,
    completedTasks: Task[],
    sendEmail: string,
  ) {
    const invoiceId: string = uuidv4();
    const client = await this.clients.findOneBy({ email: clientEmail });
    if (!client) {
      await this.log.save({
        email: clientEmail,
        successfully: false,
      });
      throw new BadRequestException({ message: 'Invalid email' });
    }
    const { firstName, lastName } = client;
    const { name, address, scope } = client.company;
    const summCost: number = this.helper.getSummTask(completedTasks);
    const dateNow: Date = new Date();
    const dateFormatDDMMYYYY = this.helper.getFormatedDate(dateNow);
    await this.log.save({
      email: clientEmail,
      firstName,
      lastName,
      successfully: true,
      company: name,
      invoiceId,
      summCost,
    });
    const objectForPDF = {
      sendEmail,
      clientEmail,
      name,
      address,
      scope,
      firstName,
      lastName,
      summCost,
      completedTasks,
      dateFormatDDMMYYYY,
      invoiceId,
    };

    await this.invoiceQueue.add('generateAndSendInvoice', {
      objectForPDF,
      ownerInfo,
      file,
    });

    return { message: 'Invoice send email' };
  }
}
