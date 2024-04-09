import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsOptional, IsString } from 'class-validator';

export class InsertNoteDto {
  @ApiProperty()
  @IsEmpty()
  @IsString()
  title: string;
  @IsEmpty()
  @IsString()
  @ApiProperty()
  content: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;
}

export class UpdateNoteDto {
  @IsOptional()
  @ApiProperty()
  title?: string;
  @IsOptional()
  @ApiProperty()
  content: string;
  @IsOptional()
  @ApiProperty()
  description: string;
}
