import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompaniesService } from './company.service';
import { Company } from '../common/entity/Companies';

describe('The CompaniesService', () => {
  let companyService: CompaniesService;
  let company: Repository<Company>;
  const resultFind = [
    {
      id: 2,
      name: 'mcDoner',
      address: '130 High St, London SE20 7EZ',
      scope: 'FastFood',
      createdAt: new Date('2022-07-06T08:28:30.139Z'),
      updatedAt: new Date('2022-07-06T08:28:30.139Z'),
    },
  ];

  const resultList = {
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
      providers: [
        CompaniesService,

        {
          provide: getRepositoryToken(Company),
          useValue: {
            find: async () => resultFind,
          },
        },
      ],
    }).compile();
    companyService = await moduleRef.resolve(CompaniesService);
    company = await moduleRef.resolve(getRepositoryToken(Company));
  });
  beforeEach(async () => {
    jest.resetAllMocks();
  });

  it('return array', async () => {
    jest.spyOn(company, 'find');
    expect(await companyService.list()).toStrictEqual(resultList);
  });
});
