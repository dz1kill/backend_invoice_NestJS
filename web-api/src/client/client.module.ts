import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from '../data-source';
import { Client } from '../common/entity/Clients';
import { ClientsController } from './client.controller';
import { ClientsService } from './client.service';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
  imports: [
    TypeOrmModule.forFeature([Client]),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dbConfig),
  ],
})
export class ClientModule {}
