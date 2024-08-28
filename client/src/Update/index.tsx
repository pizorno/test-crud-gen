import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Note, useNotes } from '../context/Notes.context';
import { useNavigate, useParams } from 'react-router-dom';

const UpdatePage = () => {
  const navigate = useNavigate()


      const {getNoteById,note ,updateNote} = useNotes();

      
      const [loading,setLoading] = useState(true)
      const params = useParams<{id:string}>();
      
      useEffect(()=>{
        if(params.id){
          try {
                  getNoteById(params.id)
            } catch (error) {
              console.log(error);
              
            }finally{
              setLoading(false)
            }
          }
        },[])
        
        const [state, setState] = useState<Note>({
          _id: note._id||'',
          content: note.content||'',
          createdAt: note.createdAt||'',
          isPublish: note.isPublish||false,
          short_desc: note.short_desc||'',
          title: note.title||''
        })
        console.log({note,state});
        
  // const [state, setState] = useState({
  //   title: '',
  //   short_desc: '',
  //   content: ''
  // })
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const { createNote } = useNotes();
  const AddNoteFn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // const formData =new FormData(e.currentTarget);


    try {
      // const title= formData.get("title") as string
      // const short_desc = formData.get("short_desc") as string
      // const content = formData.get("content") as string
      if (!params.id||!state.title || !state.short_desc || !state.content) {
        alert("fill all details")
        return
      }

      await updateNote(params.id,state.title, state.short_desc, state.content);
      navigate("/")
      // const res = await AxiosProvider.post("/create", { title, short_desc, content });
      // const data = await res.data;
      // console.log(data);
      
    } catch (error: any) {
      console.log(error.message);

    } finally {
      // @ts-ignore
      // e.currentTarget.reset()
      setState({
        title: '',
        short_desc: '',
        content: ''
      })
    }




  }

  if (loading){
    return <div>loading....</div>
  }
  return (
    <div className='container py-2 '>
      <button onClick={() => navigate("/")} className='btn btn-dark'>
        back
      </button>
      <div className="mb-3">
        <h1>Update Page</h1>
      </div>

      <form onSubmit={AddNoteFn} className="col-sm-10  mx-auto">
        <div className="mb-3">
          <label htmlFor="title">Title</label>
          <input onChange={onChangeHandler} value={state.title} type="text" name='title' placeholder='Enter Note Title' className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="short_desc">Desc</label>
          <textarea onChange={onChangeHandler} value={state.short_desc} rows={2} name='short_desc' placeholder='Enter Note Short Desc' className="form-control"></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="content">Content</label>
          <textarea onChange={onChangeHandler} value={state.content} rows={3} name='content' placeholder='Enter Note Content' className="form-control"></textarea>
        </div>
        <div className="mb-3 d-flex w-full">
          <button className=" btn-danger btn">Submit</button>
        </div>

      </form>
    </div>


  )
}

export default UpdatePage