import { Test } from '@nestjs/testing';
import { LogsController } from './log.controllers';
import { LogsService } from './log.service';

describe('LogsController', () => {
  let logController: LogsController;
  let logService: LogsService;
  const resultAllSummCostList = { data: [{ summ: 816 }] };
  const resultList = {
    data: [
      {
        id: 7,
        firstName: 'Oliver',
        lastName: 'Williams',
        email: 'will24@examples.com',
        company: 'KFC',
        successfully: true,
        summCost: 42,
        invoiceId: '20c6961c-4166-4dd8-9625-e3894cacc576',
        createdAt: new Date('2022-07-08T11:29:01.198Z'),
      },
    ],
  };

  const logReqest = {
    from: new Date('2022-07-08'),
    to: new Date('2022-07-08'),
  };
  const resultSummCostday = {
    data: [
      {
        sum: '522',
        date: '2022-07-08',
      },
    ],
  };
  const resultAllUserSumm = {
    data: [
      {
        email: 'oleg23@examples.com',
        sum: '252',
        date: '2022-07-12',
      },
    ],
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [LogsController],
      providers: [
        {
          provide: LogsService,
          useValue: {
            list: async () => resultList,
            allSummCostList: async () => resultAllSummCostList,
            summCostListDay: async () => resultSummCostday,
            UserSummCostListDay: async () => resultSummCostday,
            AllUserSummCostListDay: async () => resultAllUserSumm,
          },
        },
      ],
    }).compile();

    logService = moduleRef.get<LogsService>(LogsService);
    logController = moduleRef.get<LogsController>(LogsController);
  });
  beforeEach(async () => {
    jest.resetAllMocks();
  });

  it('list: return object', async () => {
    jest.spyOn(logService, 'list');

    expect(await logController.list()).toStrictEqual(resultList);
  });
  it('list: return error', async () => {
    jest.spyOn(logService, 'list').mockImplementation(() => {
      throw new Error();
    });
    expect(await logController.list()).toHaveProperty(
      'message',
      'Error LogController',
    );
  });

  it('summCost: return object', async () => {
    jest.spyOn(logService, 'allSummCostList');
    expect(await logController.summCostlist(logReqest)).toStrictEqual(
      resultAllSummCostList,
    );
  });
  it('summCost: return error', async () => {
    jest.spyOn(logService, 'allSummCostList').mockImplementation(() => {
      throw new Error();
    });
    expect(await logController.summCostlist(logReqest)).toHaveProperty(
      'message',
      'Error LogController Summcost',
    );
  });

  it('summCostDay: return object', async () => {
    jest.spyOn(logService, 'summCostListDay');
    expect(await logController.summCostDay(logReqest)).toStrictEqual(
      resultSummCostday,
    );
  });
  it('summCostDay: return error', async () => {
    jest.spyOn(logService, 'summCostListDay').mockImplementation(() => {
      throw new Error();
    });
    expect(await logController.summCostDay(logReqest)).toHaveProperty(
      'message',
      'Error LogController Summcostday',
    );
  });

  const email = { email: 'wendy@example.com' };
  it('userSummADay/return object', async () => {
    jest.spyOn(logService, 'UserSummCostListDay');
    expect(await logController.UserSummCostDay(email)).toStrictEqual(
      resultSummCostday,
    );
  });
  it('userSummADay: return error', async () => {
    jest.spyOn(logService, 'UserSummCostListDay').mockImplementation(() => {
      throw new Error();
    });
    expect(await logController.UserSummCostDay(email)).toHaveProperty(
      'message',
      'Error LogController Usersummaday',
    );
  });

  it('allUserSummADay: return object', async () => {
    jest
      .spyOn(logService, 'AllUserSummCostListDay')
      .mockImplementation(async () => resultAllUserSumm);
    expect(await logController.AllUserSummCostDay()).toStrictEqual(
      resultAllUserSumm,
    );
  });
  it('allUserSummADay: return error', async () => {
    jest.spyOn(logService, 'AllUserSummCostListDay').mockImplementation(() => {
      throw new Error();
    });
    expect(await logController.AllUserSummCostDay()).toHaveProperty(
      'message',
      'Error LogController Allusersummaday',
    );
  });
});
