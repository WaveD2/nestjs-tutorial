import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { JwtServiceGlobal } from 'src/auth/strategy';
import { OK } from 'core';
import { UpdateDTO } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtServiceGlobal: JwtServiceGlobal,
  ) {}

  async getUserById(userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const token = await this.jwtServiceGlobal.generateTokens(
      user.id,
      user.email,
    );

    return new OK({
      message: 'Đăng nhập thành công',
      data: { ...user, token },
    });
  }

  async updateUser(userId: number, userData: UpdateDTO) {
    try {
      const updatedUser = await this.prismaService.user.update({
        where: { id: userId },
        data: userData,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          createdAt: true,
        },
      });
      return new OK({
        message: 'Cập nhật thành công',
        data: { ...updatedUser },
      });
    } catch (error) {
      throw new Error('Could not update user');
    }
  }

  async deleteUser(userId: number) {
    try {
      const deletedUser = await this.prismaService.user.delete({
        where: { id: userId },
      });
      return new OK({
        message: `Xóa ${deletedUser.lastName} thành công`,
        data: { ...deletedUser },
      });
    } catch (error) {
      throw new Error('Could not delete user');
    }
  }
}
