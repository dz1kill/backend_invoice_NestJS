import 'reflect-metadata';
import * as config from 'config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Client } from './common/entity/Clients';
import { Company } from './common/entity/Companies';
import { Log } from './common/entity/Logs';
import { join } from 'path';

export const dbConfig: DataSourceOptions = {
  type: 'postgres',
  host: config.get('DBconfig.host'),
  port: config.get('DBconfig.port'),
  username: config.get('DBconfig.username'),
  password: config.get('DBconfig.password'),
  database: config.get('DBconfig.database'),
  entities: [Company, Client, Log],
  synchronize: false,
  logging: true,
  migrations: [join(__dirname, '..', 'migration', '*.{ts,js}')],
  subscribers: [],
};

export const AppDataSource = new DataSource(dbConfig);

export const redisConfig = {
  host: config.get('redisConfig.host'),
  port: config.get('redisConfig.port'),
  password: config.get('redisConfig.password'),
  database: config.get('redisConfig.database'),
};
