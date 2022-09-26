import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompaniesService } from './company.service';

@Controller('companies')
@ApiTags('Companies')
export class CompaniesController {
  constructor(private readonly service: CompaniesService) {}
  @Get('all')
  @HttpCode(HttpStatus.ACCEPTED)
  async list() {
    try {
      return this.service.list();
    } catch (e) {
      return { message: 'Error CompanyController' };
    }
  }
}
