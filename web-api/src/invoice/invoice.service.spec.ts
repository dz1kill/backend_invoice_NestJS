import { Test } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { getQueueToken } from '@nestjs/bull';
import { Client } from '../common/entity/Clients';
import { Log } from '../common/entity/Logs';
import { InvoiceService } from './invoice.service';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { HelperInvoice } from './helper';

describe('The InvoiceService', () => {
  let invoiceService: InvoiceService;
  let client: Repository<Client>;
  let log: Repository<Log>;
  let helper: HelperInvoice;
  const file = <File[]>[];
  const completedTasks = [
    {
      taskName: 'Repairing Car',
      cost: 27,
    },
    {
      taskName: 'Cleaning Car',
      cost: 15,
    },
  ];

  const resultClientEmail = {
    id: 1,
    firstName: 'Johni',
    lastName: 'Doel',
    email: 'doel123@examples.com',
    createdAt: new Date('2022-07-06T08:28:30.141Z'),
    updatedAt: new Date('2022-07-06T08:28:30.141Z'),
    company: {
      id: 4,
      name: 'Evroopt',
      address: 'Bromley Hill, Bromley BR1 4JD',
      scope: 'Shop',
      createdAt: new Date('2022-07-06T08:28:30.139Z'),
      updatedAt: new Date('2022-07-06T08:28:30.139Z'),
    },
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        InvoiceService,

        {
          provide: getRepositoryToken(Client),
          useValue: {
            findOneBy: () => resultClientEmail,
          },
        },

        {
          provide: getRepositoryToken(Log),
          useValue: {
            save: () => {},
          },
        },
        {
          provide: getQueueToken('Invoice'),
          useValue: {
            add: () => {},
          },
        },
      ],
    }).compile();
    invoiceService = await moduleRef.resolve(InvoiceService);
    client = await moduleRef.resolve(getRepositoryToken(Client));
    log = await moduleRef.resolve(getRepositoryToken(Log));
  });
  beforeEach(async () => {
    jest.resetAllMocks();
  });

  describe('test getSumm', () => {
    it('return number', async () => {
      expect(helper.getSummTask(completedTasks)).toStrictEqual(42);
    });
  });

  describe('test generate', () => {
    it('return message ', async () => {
      const clientEmail = 'example@example.com';
      const sendEmail = 'example@example.com';
      jest.spyOn(client, 'findOneBy');
      jest.spyOn(log, 'save');

      expect(
        await invoiceService.generate(
          file,
          clientEmail,
          completedTasks,
          sendEmail,
        ),
      ).toStrictEqual({ message: 'Invoice send email' });
    });
    it('return error invalid email ', async () => {
      const clientEmail = 'example@example.com';
      const sendEmail = 'example@example.com';
      jest.spyOn(client, 'findOneBy').mockReturnValue(null);
      try {
        await invoiceService.generate(
          file,
          clientEmail,
          completedTasks,
          sendEmail,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error).toHaveProperty('message', 'Invalid email');
      }
    });
  });
});
