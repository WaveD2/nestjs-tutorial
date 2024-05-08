import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';

interface figFile {
  dir: string;
  path: string;
}

const configFileUpload = {
  appId: '1231',
};

@Module({
  providers: [
    FilesService,
    {
      provide: 'CONFIG_FILE',
      useValue: configFileUpload,
    },
  ],
  controllers: [FilesController],
})
export class FilesModule {}
