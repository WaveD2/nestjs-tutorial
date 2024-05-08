import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { NoteModule } from './note/note.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { FilesModule } from './files/files.module';
import { AllExceptionsFilter } from 'src/utils/exception.local';
import { LoggerService } from 'services/logger.error';

@Module({
  imports: [
    AuthModule,
    NoteModule,
    PrismaModule,
    UserModule,
    FilesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, UserController],
  // nơi chứa các Injectable
  providers: [AppService, AllExceptionsFilter, LoggerService],
  exports: [],
})
export class AppModule {}
