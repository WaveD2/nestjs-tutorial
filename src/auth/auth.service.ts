import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import * as argon from 'argon2';
import { AuthDTO, RegisterDTO } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { BadRequestError, CREATED, OK } from 'core';
import { JwtServiceGlobal } from './strategy';

@Injectable()
export class AuthService {
  //
  constructor(
    private prismaService: PrismaService,
    private readonly jwtServiceGlobal: JwtServiceGlobal,
  ) {}

  createUser = () => {
    return { name: 'true', password: '123' };
  };

  async register(body: RegisterDTO) {
    const hashedPassword = await argon.hash(body.password);

    try {
      const userData: Prisma.UserCreateInput = {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: hashedPassword,
      };

      const user = await this.prismaService.user.create({
        data: userData,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      });

      // const token = await this.convertToJwtString(user.id, user.email);

      return new CREATED({
        message: 'Đăng ký thành công',
        data: { ...user },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Email da ton tai');
      }

      throw new ForbiddenException(error?.message);
    }
  }

  async login(data: AuthDTO) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email: data.email },
      });

      if (!user) {
        throw new BadRequestError('Không tìm thấy user');
      }
      const pass = await argon.verify(user.password, data.password);
      if (!pass) {
        throw new BadRequestError('Password không chính xác');
      }

      const token = await this.jwtServiceGlobal.generateTokens(
        user.id,
        user.email,
      );

      delete user.password;

      return new OK({
        message: 'Đăng nhập thành công',
        data: { ...user, token },
      });
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
