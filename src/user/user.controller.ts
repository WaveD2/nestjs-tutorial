import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { MyJwtGuard } from 'src/auth/guard';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  // @UseGuards(AuthGuard('jwt'))

  // @ApiBearerAuth()
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 401, description: 'Invalid authentication' })
  @UseGuards(MyJwtGuard)
  @Get('me')
  me(@GetUser() user: User) {
    return user;
  }

  // C1 : me(@Req() req: Request) {
  //   return req.user;
  // }
}
