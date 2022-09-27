import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientsService } from './client.service';

@Controller('clients')
@ApiTags('Clients')
export class ClientsController {
  constructor(private readonly service: ClientsService) {}
  @Get('all')
  @HttpCode(HttpStatus.ACCEPTED)
  async list() {
    try {
      return this.service.list();
    } catch (e) {
      return { message: 'Error ClientController' };
    }
  }
}
