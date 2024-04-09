import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

//Define a "type" of authentication request
export class AuthDTO {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

// sử dụng với TH no class validater
// export interface AuthDTO {
//   email: string;
//   password: string;
// }
