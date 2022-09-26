import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from '../common/entity/Logs';
import { LogsService } from './log.service';

describe('The LogService', () => {
  let logService: LogsService;
  let client: Repository<Log>;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        LogsService,
        {
          provide: getRepositoryToken(Log),
          useFactory: () => ({
            manager: {},
          }),
        },
      ],
    }).compile();
    logService = await moduleRef.get(LogsService);
    client = await moduleRef.get(getRepositoryToken(Log));
  });
  beforeEach(async () => {
    jest.resetAllMocks();
  });

  it(' list: return object', async () => {
    const resultGetRepository = [
      {
        id: 7,
        firstName: 'Oliver',
        lastName: 'Williams',
        email: 'will24@examples.com',
        company: 'KFC',
        successfully: true,
        summCost: 42,
        invoiceId: '20c6961c-4166-4dd8-9625-e3894cacc576',
        createdAt: '2022-07-08T11:29:01.198Z',
      },
    ];
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
          createdAt: '2022-07-08T11:29:01.198Z',
        },
      ],
    };
    const getMany = jest.fn(() => resultGetRepository);
    const createQueryBuilder = jest.fn(() => ({ getMany }));
    client.manager.getRepository = jest
      .fn()
      .mockReturnValue({ createQueryBuilder });

    expect(await logService.list()).toStrictEqual(resultList);
  });
  it('allSummCostList: return object', async () => {
    const resultGetRepository = [
      {
        sum: '732',
      },
    ];
    const resultAllSummCostList = {
      data: [
        {
          sum: '732',
        },
      ],
    };
    const from = new Date('2022-07-08');
    const to = new Date('2022-07-08');
    const getRawMany = jest.fn(() => resultGetRepository);
    const select = jest.fn(() => ({ getRawMany }));
    const where = jest.fn(() => ({ select }));
    const createQueryBuilder = jest.fn(() => ({ where }));
    client.manager.getRepository = jest
      .fn()
      .mockReturnValue({ createQueryBuilder });

    expect(await logService.allSummCostList(from, to)).toStrictEqual(
      resultAllSummCostList,
    );
    expect(select).toHaveBeenCalledWith('sum("summ_cost")');
    expect(where).toHaveBeenCalledWith(
      `log.successfully = :successfully AND log.created_at BETWEEN :from AND :to `,
      {
        successfully: true,
        from: `${from}`,
        to: `${to}`,
      },
    );
  });
  it('summCostListDay: return object', async () => {
    const resultGetRepository = [
      {
        sum: '522',
        date: '2022-07-08',
      },
    ];
    const resultSummCostListDay = {
      data: [
        {
          sum: '522',
          date: '2022-07-08',
        },
      ],
    };
    const from = new Date('2022-07-08');
    const to = new Date('2022-07-08');
    const getRawMany = jest.fn(() => resultGetRepository);
    const groupBy = jest.fn(() => ({ getRawMany }));
    const select = jest.fn(() => ({ groupBy }));
    const where = jest.fn(() => ({ select }));
    const createQueryBuilder = jest.fn(() => ({ where }));
    client.manager.getRepository = jest
      .fn()
      .mockReturnValue({ createQueryBuilder });

    expect(await logService.summCostListDay(from, to)).toStrictEqual(
      resultSummCostListDay,
    );
    expect(where).toHaveBeenCalledWith(
      expect.stringContaining(''),
      expect.objectContaining({
        successfully: true,
        from: `${from}`,
        to: `${to}`,
      }),
    );
    expect(select).toHaveBeenCalledWith(
      'sum("summ_cost") , substring(cast("created_at" as TEXT), 1, 10) AS date ',
    );
    expect(groupBy).toHaveBeenCalledWith('date');
  });
  it('UserSummCostListDay: return object', async () => {
    const resultGetRepository = [
      {
        sum: '522',
        date: '2022-07-08',
      },
    ];
    const resultUserSummCostListDay = {
      data: [
        {
          sum: '522',
          date: '2022-07-08',
        },
      ],
    };
    const email = 'will24@examples.com';
    const getRawMany = jest.fn(() => resultGetRepository);
    const groupBy = jest.fn(() => ({ getRawMany }));
    const select = jest.fn(() => ({ groupBy }));
    const where = jest.fn(() => ({ select }));
    const createQueryBuilder = jest.fn(() => ({ where }));
    client.manager.getRepository = jest
      .fn()
      .mockReturnValue({ createQueryBuilder });
    expect(await logService.UserSummCostListDay(email)).toStrictEqual(
      resultUserSummCostListDay,
    );
    expect(where).toHaveBeenCalledWith(
      `log.successfully = :successfully AND log.email = :email `,
      {
        successfully: true,
        email: `${email}`,
      },
    );
    expect(select).toHaveBeenCalledWith(
      'sum("summ_cost"), substring(cast("created_at" as TEXT), 1, 10) AS date ',
    );
    expect(groupBy).toHaveBeenCalledWith('date');
  });

  it('AllUserSummCostListDay: return object', async () => {
    const resultGetRepository = [
      {
        email: 'oleg23@examples.com',
        sum: '252',
        date: '2022-07-12',
      },
    ];
    const resultAllUserSummCostListDay = {
      data: [
        {
          email: 'oleg23@examples.com',
          sum: '252',
          date: '2022-07-12',
        },
      ],
    };
    const email = 'will24@examples.com';
    const getRawMany = jest.fn(() => resultGetRepository);
    const orderBy = jest.fn(() => ({ getRawMany }));
    const addGroupBy = jest.fn(() => ({ orderBy }));
    const groupBy = jest.fn(() => ({ addGroupBy }));
    const select = jest.fn(() => ({ groupBy }));
    const where = jest.fn(() => ({ select }));
    const createQueryBuilder = jest.fn(() => ({ where }));
    client.manager.getRepository = jest
      .fn()
      .mockReturnValue({ createQueryBuilder });
    expect(await logService.AllUserSummCostListDay()).toStrictEqual(
      resultAllUserSummCostListDay,
    );
    expect(where).toHaveBeenCalledWith(`log.successfully = true`);
    expect(select).toHaveBeenCalledWith(
      ' email, sum("summ_cost") , substring(cast("created_at" as TEXT), 1, 10) AS date  ',
    );
    expect(groupBy).toHaveBeenCalledWith('date');
    expect(addGroupBy).toHaveBeenCalledWith('email');
    expect(orderBy).toHaveBeenCalledWith('email');
  });
});
