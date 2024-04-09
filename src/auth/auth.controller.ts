import { PrismaService } from './../prisma/prisma.service';
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';

import * as argon from 'argon2';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  //auth service is automatically created when init the controller
  constructor(
    private authService: AuthService,

    private prismaService: PrismaService,
  ) {}

  @Get()
  getAll() {
    return this.authService.createUser();
  }

  @Post('register')
  async register(@Req() request: Request, @Body() body: AuthDTO) {
    return this.authService.register(body);
  }
  @Post('login')
  async login(@Body() authDTO: AuthDTO) {
    return this.authService.login(authDTO);
  }
}
