import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from '../common/entity/Logs';
import { Repository } from 'typeorm';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(Log)
    private client: Repository<Log>,
  ) {}
  async list() {
    const data = await this.client.manager
      .getRepository(Log)
      .createQueryBuilder('log')
      .getMany();
    return { data };
  }

  async allSummCostList(from: Date, to: Date) {
    const data = await this.client.manager
      .getRepository(Log)
      .createQueryBuilder('log')
      .where(
        `log.successfully = :successfully AND log.created_at BETWEEN :from AND :to `,
        {
          successfully: true,
          from: `${from}`,
          to: `${to}`,
        },
      )
      .select('sum("summ_cost")')
      .getRawMany();
    return { data };
  }

  async summCostListDay(from: Date, to: Date) {
    const data = await this.client.manager
      .getRepository(Log)
      .createQueryBuilder('log')
      .where(
        `log.successfully = :successfully AND log.created_at BETWEEN :from AND :to `,
        {
          successfully: true,
          from: `${from}`,
          to: `${to}`,
        },
      )
      .select(
        'sum("summ_cost") , substring(cast("created_at" as TEXT), 1, 10) AS date ',
      )
      .groupBy('date')
      .getRawMany();
    return { data };
  }

  async UserSummCostListDay(email: string) {
    const data = await this.client.manager
      .getRepository(Log)
      .createQueryBuilder('log')
      .where(`log.successfully = :successfully AND log.email = :email `, {
        successfully: true,
        email: `${email}`,
      })
      .select(
        'sum("summ_cost"), substring(cast("created_at" as TEXT), 1, 10) AS date ',
      )
      .groupBy('date')
      .getRawMany();
    return { data };
  }

  async AllUserSummCostListDay() {
    const data = await this.client.manager
      .getRepository(Log)
      .createQueryBuilder('log')
      .where(`log.successfully = true`)
      .select(
        ' email, sum("summ_cost") , substring(cast("created_at" as TEXT), 1, 10) AS date  ',
      )
      .groupBy('date')
      .addGroupBy('email')
      .orderBy('email')
      .getRawMany();
    return { data };
  }
}
