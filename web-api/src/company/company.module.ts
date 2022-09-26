import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from '../data-source';
import { Company } from '../common/entity/Companies';
import { CompaniesController } from './company.controller';
import { CompaniesService } from './company.service';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService],
  imports: [
    TypeOrmModule.forFeature([Company]),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dbConfig),
  ],
})
export class CompanyModule {}
