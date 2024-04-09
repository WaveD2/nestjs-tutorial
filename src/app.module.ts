import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { NoteModule } from './note/note.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    NoteModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
  ],
  controllers: [AppController, UserController],
  // nơi chứa các Injectable
  providers: [AppService],
  exports: [],
})
export class AppModule {}
