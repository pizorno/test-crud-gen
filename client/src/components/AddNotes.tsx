import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useNotes } from '../context/Notes.context';

const AddNotes = () => {

    const [state,setState] = useState({
        title:'',
        short_desc:'',
        content:''
    })
    const onChangeHandler =(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }

const {createNote } = useNotes();
    const AddNoteFn =async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        // const formData =new FormData(e.currentTarget);

            
        try {
                    // const title= formData.get("title") as string
                    // const short_desc = formData.get("short_desc") as string
                    // const content = formData.get("content") as string
                    if (!state.title || !state.short_desc || !state.content) {
                        alert("fill all details")
                        return
                    }

            await createNote(state.title, state.short_desc, state.content);
                    // const res = await AxiosProvider.post("/create", { title, short_desc, content });
                    // const data = await res.data;
                    // console.log(data);
                } catch (error:any) {
                            console.log(error.message);
                            
                }finally{
                        // @ts-ignore
                    // e.currentTarget.reset()
                    setState({
                        title: '',
                        short_desc: '',
                        content: ''
                    })
                }
                        

                

    }

  return (
    <div className='container py-2 '>
              <div className="mb-3">
                  <h1>Add Note</h1>
              </div>

              <form onSubmit={AddNoteFn} className="col-sm-10 ">
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

export default AddNotes