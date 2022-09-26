import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { InvoiceParamDto, InvoiceRequestDto } from './dto/invoice-request.dto';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';

describe('InvoiceController', () => {
  const invoiceRequestDto = new InvoiceRequestDto();
  const invoiceParamDto = new InvoiceParamDto();
  const file = <File[]>[];
  let invoiceController: InvoiceController;
  let invoiceService: InvoiceService;
  const result = { message: 'Invoice send email' };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [InvoiceController],
      providers: [
        {
          provide: InvoiceService,
          useValue: {
            generate: async () => result,
          },
        },
      ],
    }).compile();

    invoiceService = moduleRef.get<InvoiceService>(InvoiceService);
    invoiceController = moduleRef.get<InvoiceController>(InvoiceController);
  });
  beforeEach(async () => {
    jest.resetAllMocks();
  });

  it('list: return array', async () => {
    jest.spyOn(invoiceService, 'generate');
    expect(
      await invoiceController.generate(
        invoiceRequestDto,
        file,
        invoiceParamDto,
      ),
    ).toStrictEqual(result);
  });
  it('list: return error', async () => {
    jest.spyOn(invoiceService, 'generate').mockImplementation(() => {
      throw new Error();
    });
    expect(
      await invoiceController.generate(
        invoiceRequestDto,
        file,
        invoiceParamDto,
      ),
    ).toHaveProperty('message', 'Error InvoiceService');
  });
});
