import { Injectable } from '@nestjs/common';
import { InsertNoteDto, UpdateNoteDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NoteService {
  constructor(private prismaService: PrismaService) {}
  async getNotes(userId: number) {
    const notes = await this.prismaService.note.findMany({
      where: { userId },
    });

    return notes;
  }
  async getDetailNote(noteId: number) {
    const note = await this.prismaService.note.findUnique({
      where: { id: noteId },
    });

    return note;
  }

  async insertNote(userId: number, insertNote: InsertNoteDto) {
    try {
      const note = await this.prismaService.note.create({
        data: {
          ...insertNote,
          userId,
        },
      });
      return note;
    } catch (error) {
      return error;
    }
  }

  async updateNote(noteId: number, updateNote: UpdateNoteDto) {
    try {
      const newNote = await this.prismaService.note.update({
        where: { id: noteId },
        data: { ...updateNote },
      });

      return newNote;
    } catch (error) {
      return error;
    }
  }
}
