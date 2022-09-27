import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LogReqestDto, UserInfoReqDto } from './dto/log.reqest.dto';
import { LogsService } from './log.service';

@Controller('logs')
@ApiTags('Logs')
export class LogsController {
  constructor(private readonly service: LogsService) {}
  @Get('all')
  @HttpCode(HttpStatus.ACCEPTED)
  async list() {
    try {
      return this.service.list();
    } catch (e) {
      return { message: 'Error LogController' };
    }
  }

  @Get('summCost')
  @HttpCode(HttpStatus.ACCEPTED)
  async summCostlist(@Query() logParamDto: LogReqestDto) {
    try {
      return this.service.allSummCostList(logParamDto.from, logParamDto.to);
    } catch (e) {
      return { message: 'Error LogController Summcost' };
    }
  }

  @Get('summCostDay')
  @HttpCode(HttpStatus.ACCEPTED)
  async summCostDay(@Query() logParamDto: LogReqestDto) {
    try {
      return this.service.summCostListDay(logParamDto.from, logParamDto.to);
    } catch (e) {
      return { message: 'Error LogController Summcostday' };
    }
  }

  @Get('userSummADay')
  @HttpCode(HttpStatus.ACCEPTED)
  async UserSummCostDay(@Query() UserInfoReqDto: UserInfoReqDto) {
    try {
      return this.service.UserSummCostListDay(UserInfoReqDto.email);
    } catch (e) {
      return { message: 'Error LogController Usersummaday' };
    }
  }

  @Get('allUserSummADay')
  @HttpCode(HttpStatus.ACCEPTED)
  async AllUserSummCostDay() {
    try {
      return this.service.AllUserSummCostListDay();
    } catch (e) {
      return { message: 'Error LogController Allusersummaday' };
    }
  }
}
