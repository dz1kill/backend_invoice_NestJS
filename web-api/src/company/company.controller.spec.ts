import { Test } from '@nestjs/testing';
import { CompaniesController } from './company.controller';
import { CompaniesService } from './company.service';

describe('CompanyController', () => {
  let companyController: CompaniesController;
  let companyService: CompaniesService;
  const result = {
    data: [
      {
        id: 2,
        name: 'mcDoner',
        address: '130 High St, London SE20 7EZ',
        scope: 'FastFood',
        createdAt: new Date('2022-07-06T08:28:30.139Z'),
        updatedAt: new Date('2022-07-06T08:28:30.139Z'),
      },
    ],
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CompaniesController],
      providers: [
        {
          provide: CompaniesService,
          useValue: {
            list: async () => result,
          },
        },
      ],
    }).compile();

    companyService = moduleRef.get<CompaniesService>(CompaniesService);
    companyController = moduleRef.get<CompaniesController>(CompaniesController);
  });
  beforeEach(async () => {
    jest.resetAllMocks();
  });

  it('return object', async () => {
    jest.spyOn(companyService, 'list');
    expect(await companyController.list()).toStrictEqual(result);
  });
  it('return error', async () => {
    jest.spyOn(companyService, 'list').mockImplementation(() => {
      throw new Error();
    });
    expect(await companyController.list()).toHaveProperty(
      'message',
      'Error CompanyController',
    );
  });
});
