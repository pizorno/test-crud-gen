import { IsMongoId, IsNotEmpty } from "class-validator";

export class CreateNotesDto{

            
            @IsNotEmpty({message:"Title is required"})
            title:string
   

    @IsNotEmpty({ message: "Short Desc is required" })
    short_desc: string

    @IsNotEmpty({ message: "Content is required" })
    content: string



}


export class getNoteDto {

    @IsMongoId({message:"Please provide valid mongodb id"})
    @IsNotEmpty({ message: "Title is required" })
    id:string

}
