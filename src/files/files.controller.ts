import {
  Controller,
  FileTypeValidator,
  Inject,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
  constructor(@Inject('CONFIG_FILE') configFile: any) {
    console.log(configFile);
  }

  //
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile()
    files //   new ParseFilePipe({
    //     validators: [new FileTypeValidator({ fileType: 'image/jpg' })],
    //   }),
    : Array<Express.Multer.File>,
  ) {
    console.log(files);

    return 1;
  }
}
