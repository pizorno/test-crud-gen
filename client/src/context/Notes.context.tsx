import React, { createContext, useContext, useEffect, useState } from 'react'
import { AxiosProvider } from '../Constant'


export interface Note{
    _id: string
    title: string
    short_desc:string
    content:string
    isPublish:boolean,
    createdAt:string
}

interface Notes {
    createNote: (title: string, short_desc: string, content: string) => void;
    updateNote: (id:string,title: string, short_desc: string, content: string) => void;
    deleteNote: (id: string) => void;
    togglePublished: (id: string) => void;
    notes: Note[],
    note:Note,
    getNoteById: (id: string) => void;
    
}

const NotesContext = createContext<Notes>({
    createNote() {
        
    },
    updateNote(){},
    notes:[],
    deleteNote(){},
    togglePublished(){},
    note:{
        _id: '',
        content: '',
        createdAt: '',
        isPublish: false,
        short_desc: '',
        title: ''
    },
    getNoteById(){}
});

export const useNotes = ()=>{
    return useContext(NotesContext);
}


export const NotesProvider = ({children}:{children:React.ReactNode}) => {


    const [notes, setNotes] = useState<Note[]>([]);
    const [note, setNote] = useState<Note>({
        _id:'',
        content:'',
        createdAt:'',
        isPublish:false,
        short_desc:'',
        title:''
    });


    const getNoteById=async(id:string)=>{
        const data = (await(AxiosProvider.get(`/get/${id}`))).data;
        setNote(data);
    }



        const fetchAllNotes = async()=>{
            const data = (await (AxiosProvider.get("/get-all"))).data;
            setNotes(data.notes);
            // return data
        }

        useEffect(()=>{
            (async() => {await fetchAllNotes() })()
        },[])

    const createNote = async(title: string, short_desc: string, content: string)=>{
        const res = await  AxiosProvider.post("/create",{title,short_desc,content});
        const data  =await res.data;
        await fetchAllNotes()
        console.log(data.msg);
        
        // return data
    }

    const updateNote = async (id:string,title: string, short_desc: string, content: string) => {
        const res = await AxiosProvider.patch("/update/"+id, { title, short_desc, content });
        const data = await res.data;
        await fetchAllNotes()
        // await getNoteById()
        console.log(data.msg);
        // naviagte("/")

        // return data
    }


    const deleteNote=async(id:string)=>{
        const res = await AxiosProvider.delete("/delete/" + id);
        const data = await res.data;
        await fetchAllNotes()
        console.log(data.msg);
    }


    const togglePublished = async (id: string) => {
        const res = await AxiosProvider.put("/publish/" + id);
        const data = await res.data;
        await fetchAllNotes()
        console.log(data.msg);
    }
  return (
      <NotesContext.Provider value={{ notes, createNote, deleteNote, togglePublished, note, getNoteById, updateNote }}>{children}</NotesContext.Provider>
  )
}

export default NotesProvider