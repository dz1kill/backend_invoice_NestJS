import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '../common/entity/Companies';
import { Repository } from 'typeorm';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private client: Repository<Company>,
  ) {}
  async list() {
    const data = await this.client.find();
    return {
      data,
    };
  }
}
