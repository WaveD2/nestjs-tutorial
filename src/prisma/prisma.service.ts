import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(configService: ConfigService) {
    super({
      datasources: {
        db: {
          // url: 'mysql://root:đ̉đôâđđâ@localhost:3307/nestjs-basics?schema=public',
          url: configService.get('DATABASE_URL'),
        },
      },
    });
  }

  // In a 1 -N relation , delete N firstly, then delete '1'
  cleanDataBase() {
    // return this.$transaction({

    // })
    this.note.deleteMany();
    this.user.deleteMany();
  }
}
