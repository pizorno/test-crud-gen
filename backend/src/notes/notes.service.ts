import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNotesDto } from 'src/dto/Notes.dto';
import { Notes } from 'src/models/Notes.models';
import slugify from 'slugify'

@Injectable()
export class NotesService {

        constructor(
            @InjectModel(Notes.name) private NotesModel :Model<Notes>
        ){}



    async getAllNotes(){
        const all_notes = await this.NotesModel.find({});

        return {
            notes:all_notes,
            total:all_notes.length
        }
    }

   async createNote(data:CreateNotesDto){

                const { content,short_desc,title} = data;
                const slug = slugify(title+" "+new Date().getTime(),{
                    lower:true,
                    replacement:'-',
                    trim:true,
                })

       await  this.NotesModel.create({
            slug,
            content,
            short_desc,title
        })
        return {
            msg:"Note Created"
        }
            // return data
    }

    async deleteNoteById(id:string){
        const data = await this.NotesModel.findByIdAndDelete(id);
        if(!data){
            throw new NotFoundException('Note Not found')
        }
        return {
            msg:"Note deleted"
        }
    }

    async togglePublished(id: string) {
        const data = await this.NotesModel.findById(id);
        if (!data) {
            throw new NotFoundException('Note Not found')
        }

        if(data.isPublish){
            await this.NotesModel.findByIdAndUpdate(id,{
                isPublish:false
            })
            return {
                msg:"Note Un-publshed"
            }
        }else{
            await this.NotesModel.findByIdAndUpdate(id, {
                isPublish: true
            })
          
        }

        return {
            msg: "Note deleted"
        }
    }

    async getNoteById(id: string) {
        const data = await this.NotesModel.findById(id);
        if (!data) {
            throw new NotFoundException('Note Not found')
        }
        return data
    }


    async updateNoteById(id:string,data:CreateNotesDto){

        const slug = slugify(data.title + " " + new Date().getTime(), {
            lower: true,
            replacement: '-',
            trim: true,
        })

        data['slug'] = slug

         await this.NotesModel.findByIdAndUpdate(id,{
            ...data
        });
       
        return {
            msg:"Note Updated"
        }
    }
    
}
