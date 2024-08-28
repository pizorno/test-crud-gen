import { Body, Controller, Get, Post, Delete, Param, Put, Patch } from '@nestjs/common';
import { CreateNotesDto, getNoteDto } from 'src/dto/Notes.dto';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {

    constructor(private NotesService:NotesService){}


    @Get("/get-all")
    getAllNotes() {
        return this.NotesService.getAllNotes()
    }

    @Get("/get/:id")
    getNoteById(@Param() data: getNoteDto) {
        return this.NotesService.getNoteById(data.id)
    }


    @Delete("/delete/:id")
    deleteNoteById(@Param() data:getNoteDto){
        return this.NotesService.deleteNoteById(data.id);
    }
    @Patch("/update/:id")
    updateNoteById(@Param() params: getNoteDto, @Body() data: CreateNotesDto) {
        return this.NotesService.updateNoteById(params.id,data);
    }
    @Put("/publish/:id")
    togglePublished(@Param() data: getNoteDto) {
        return this.NotesService.togglePublished(data.id);
    }

            @Post("/create")
            createNote(@Body() data: CreateNotesDto ){
                return this.NotesService.createNote(data)
            }

}
