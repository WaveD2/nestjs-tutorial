import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';

import * as argon from 'argon2';
import { AuthDTO } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  //
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  createUser = () => {
    return { name: 'true', password: '123' };
  };

  async register(body: AuthDTO) {
    const hashedPassword = await argon.hash(body.password);

    try {
      const user = await this.prismaService.user.create({
        data: {
          email: body.email,
          password: hashedPassword,
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      });

      const token = await this.convertToJwtString(user.id, user.email);

      return {
        messenger: 'Đăng ký thành công',
        data: { ...user },
        token,
      };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Email da ton tai');
      }
      return {
        messenger: error || error?.message,
      };
    }
  }

  async login(data: AuthDTO) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email: data.email },
      });

      if (!user) {
        throw new ForbiddenException('User not found');
      }
      const pass = await argon.verify(user.password, data.password);
      if (!pass) {
        throw new ForbiddenException('Incorrect password');
      }

      const token = await this.convertToJwtString(user.id, user.email);

      delete user.password;

      return {
        messenger: 'Đăng nhập thành công',
        data: { ...user },
        token,
      };
    } catch (error) {
      return {
        messenger: error || error?.message,
      };
    }
  }

  async convertToJwtString(
    userId: number | string,
    email: string,
  ): Promise<{ accessToken: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '10m',
      secret: this.configService.get('JWT_SECRET'),
    });

    return { accessToken };
  }
}
