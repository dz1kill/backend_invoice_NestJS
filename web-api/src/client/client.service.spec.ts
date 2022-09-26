import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Client } from '../common/entity/Clients';
import { Repository } from 'typeorm';
import { ClientsService } from './client.service';

describe('The ClientsService', () => {
  let clientService: ClientsService;
  let client: Repository<Client>;
  const resultList = {
    data: [
      {
        id: 1,
        firstName: 'Johni',
        lastName: 'Doel',
        email: 'doel123@examples.com',
        createdAt: '2022-07-06T08:28:30.141Z',
        updatedAt: '2022-07-06T08:28:30.141Z',
        company: {
          id: 4,
          name: 'Evroopt',
          address: 'Bromley Hill, Bromley BR1 4JD',
          scope: 'Shop',
          createdAt: '2022-07-06T08:28:30.139Z',
          updatedAt: '2022-07-06T08:28:30.139Z',
        },
      },
    ],
  };
  const resultFind = [
    {
      id: 1,
      firstName: 'Johni',
      lastName: 'Doel',
      email: 'doel123@examples.com',
      createdAt: '2022-07-06T08:28:30.141Z',
      updatedAt: '2022-07-06T08:28:30.141Z',
      company: {
        id: 4,
        name: 'Evroopt',
        address: 'Bromley Hill, Bromley BR1 4JD',
        scope: 'Shop',
        createdAt: '2022-07-06T08:28:30.139Z',
        updatedAt: '2022-07-06T08:28:30.139Z',
      },
    },
  ];

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ClientsService,

        {
          provide: getRepositoryToken(Client),
          useValue: {
            find: async () => resultFind,
          },
        },
      ],
    }).compile();
    clientService = await moduleRef.resolve(ClientsService);
    client = await moduleRef.resolve(getRepositoryToken(Client));
  });
  beforeEach(async () => {
    jest.resetAllMocks();
  });

  it('return object', async () => {
    jest.spyOn(client, 'find');
    expect(await clientService.list()).toStrictEqual(resultList);
  });
});
