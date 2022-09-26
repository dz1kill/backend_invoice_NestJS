import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LogReqestDto {
  @ApiProperty({
    example: '2022-09-24',
  })
  @IsNotEmpty()
  @IsString()
  from: Date;

  @ApiProperty({
    example: '2022-09-25',
  })
  @IsNotEmpty()
  @IsString()
  to: Date;
}

export class UserInfoReqDto {
  @ApiProperty({
    example: 'will24@examples.com',
  })
  @IsNotEmpty()
  @IsString()
  email: string;
}
