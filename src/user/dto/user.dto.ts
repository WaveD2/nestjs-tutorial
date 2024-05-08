import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  Matches,
  MinLength,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class UpdateDTO {
  @ApiProperty()
  @IsOptional()
  firstName?: string;
  @ApiProperty()
  @IsOptional()
  lastName?: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email?: string;
  @ApiProperty()
  @IsOptional()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z]{6,}$/, {
    message:
      'Password must contain at least one number and one uppercase letter',
  })
  password?: string;
}
