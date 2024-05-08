import { Body, Controller, Get, Post, Req } from '@nestjs/common';

import { AuthDTO, RegisterDTO } from './dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  //auth service is automatically created when init the controller
  constructor(private authService: AuthService) {}

  @Get()
  getAll() {
    return this.authService.createUser();
  }

  @Post('register')
  async register(@Req() request: Request, @Body() body: RegisterDTO) {
    return this.authService.register(body);
  }
  @Post('login')
  async login(@Body() authDTO: AuthDTO) {
    return this.authService.login(authDTO);
  }
}
