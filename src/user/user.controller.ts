import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { MyJwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';
import { UpdateDTO } from './dto/user.dto';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  // @UseGuards(AuthGuard('jwt'))
  constructor(private userService: UserService) {}
  // @ApiBearerAuth()
  // @ApiResponse({ status: 200 })
  // @ApiResponse({ status: 401, description: 'Invalid authentication' })
  @UseGuards(MyJwtGuard)
  @Get('me')
  me(@GetUser() user: User) {
    return this.userService.getUserById(user.id);
  }
  @UseGuards(MyJwtGuard)
  @Patch('me')
  update(@GetUser() user: User, @Body() body: UpdateDTO) {
    return this.userService.updateUser(user.id, body);
  }
  @UseGuards(MyJwtGuard)
  @Delete('me')
  delete(@GetUser() user: User) {
    return this.userService.deleteUser(user.id);
  }
}
