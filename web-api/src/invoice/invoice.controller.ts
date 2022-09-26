import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { InvoiceParamDto, InvoiceRequestDto } from './dto/invoice-request.dto';
import { InvoiceService } from './invoice.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('generateInvoice')
@ApiBearerAuth()
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiTags('GenerateInvoice')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('files'))
  async generate(
    @Body() invoiceRequestDto: InvoiceRequestDto,
    @UploadedFile() file,
    @Query() invoiceParamDto: InvoiceParamDto,
  ) {
    try {
      return await this.invoiceService.generate(
        file,
        invoiceRequestDto.email,
        invoiceRequestDto.completedTasks,
        invoiceParamDto.sendEmail,
      );
    } catch (error) {
      return { error, message: 'Error InvoiceService' };
    }
  }
}
