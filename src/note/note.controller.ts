import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { GetUser } from 'src/auth/decorator';
import { InsertNoteDto, UpdateNoteDto } from './dto';
import { MyJwtGuard } from 'src/auth/guard';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('note')
@Controller('note')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @ApiResponse({ status: 200, description: 'Successfully update' })
  @ApiResponse({ status: 403, description: 'Fail update' })
  @Patch(':id')
  updateNote(
    @Param('id', ParseIntPipe) noteId: number,
    @Body() updateNote: UpdateNoteDto,
  ) {
    const noteUpdate = this.noteService.updateNote(noteId, updateNote);
    return noteUpdate;
  }

  @ApiResponse({ status: 200 })
  @Get()
  getAll(@GetUser('id') userId: number) {
    const listNote = this.noteService.getNotes(userId);

    return listNote;
  }

  @Get(':id')
  getDetail(@Param('id') noteId: number) {
    const note = this.noteService.getDetailNote(noteId);

    return note;
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Successfully create' })
  @ApiResponse({ status: 403, description: 'Fail create' })
  @ApiBody({ type: InsertNoteDto })
  @Post()
  @UseGuards(MyJwtGuard)
  insertNote(
    @GetUser('id', ParseIntPipe) userId: number,
    @Body() insertNote: any,
  ) {
    const noteNew = this.noteService.insertNote(userId, insertNote);

    return noteNew;
  }
}
