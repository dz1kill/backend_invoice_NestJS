import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../common/entity/Clients';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private client: Repository<Client>,
  ) {}
  async list() {
    const data = await this.client.find();
    return {
      data,
    };
  }
}
