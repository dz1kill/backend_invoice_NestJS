import { Test } from '@nestjs/testing';
import { networkInterfaces } from 'os';
import { HelperInvoice } from './helper';

describe('The InvoiceService', () => {
  let helper: HelperInvoice;
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

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [HelperInvoice],
    }).compile();
    helper = await moduleRef.resolve(HelperInvoice);
  });
  beforeEach(async () => {
    jest.resetAllMocks();
  });

  describe('test getSummTask', () => {
    it('return number', async () => {
      expect(helper.getSummTask(completedTasks)).toStrictEqual(42);
    });
  });
  describe('test getFormatedDate', () => {
    const dateNow = new Date('2022-07-06T08:28:30.141Z');
    const result = '6.07.2022';
    it('return date', async () => {
      expect(helper.getFormatedDate(dateNow)).toBe(result);
    });
  });
});
