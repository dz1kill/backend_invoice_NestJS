import { Test } from '@nestjs/testing';
import { ClientsController } from './client.controller';
import { ClientsService } from './client.service';

describe('ClientController', () => {
  let clientController: ClientsController;
  let clientService: ClientsService;

  const result = {
    data: [
      {
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
      },
    ],
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ClientsController],
      providers: [
        {
          provide: ClientsService,
          useValue: {
            list: async () => result,
          },
        },
      ],
    }).compile();

    clientService = moduleRef.get<ClientsService>(ClientsService);
    clientController = moduleRef.get<ClientsController>(ClientsController);
  });
  beforeEach(async () => {
    jest.resetAllMocks();
  });
  it('return object', async () => {
    jest.spyOn(clientService, 'list');
    expect(await clientController.list()).toStrictEqual(result);
  });
  it('return error', async () => {
    jest.spyOn(clientService, 'list').mockImplementation(() => {
      throw new Error();
    });
    expect(await clientController.list()).toHaveProperty(
      'message',
      'Error ClientController',
    );
  });
});
