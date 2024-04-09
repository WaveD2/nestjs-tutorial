import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategy';

@Module({
  imports: [JwtModule],
  providers: [JwtStrategy],
})
export class UserModule {}
