import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from '../data-source';
import { Log } from '../common/entity/Logs';
import { LogsController } from './log.controllers';
import { LogsService } from './log.service';

@Module({
  controllers: [LogsController],
  providers: [LogsService],
  imports: [
    TypeOrmModule.forFeature([Log]),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dbConfig),
  ],
})
export class LogModule {}
