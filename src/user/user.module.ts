import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtServiceGlobal, JwtStrategy } from 'src/auth/strategy';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserService } from './user.service';

@Module({
  imports: [JwtModule, PrismaModule],
  controllers: [UserController],
  providers: [JwtStrategy, UserService, JwtServiceGlobal],
  exports: [UserService],
})
export class UserModule {}
