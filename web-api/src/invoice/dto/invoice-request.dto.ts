import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class Task {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  taskName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  cost: number;
}
export class InvoiceRequestDto {
  @ApiProperty({
    example: 'will24@examples.com',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    type: Task,
    example: [
      { taskName: 'Repairing Car', cost: 27 },
      { taskName: 'Cleaning Car', cost: 15 },
    ],
    description: 'List of completed tasks',
  })
  @Transform(({ value }) => JSON.parse(value))
  @IsNotEmpty()
  completedTasks: Task[];

  @ApiProperty({
    required: false,
    type: 'file',
    items: {
      type: 'file',
      items: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  files: any;
}
export class InvoiceParamDto {
  @ApiProperty({
    description:
      'You can specify the mail to send the invoice. By default, the invoice will be sent to clients via email.',
    required: false,
  })
  sendEmail: string;
}
