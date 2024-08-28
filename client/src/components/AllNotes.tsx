import React from 'react'
import { Note, useNotes } from '../context/Notes.context'
import { Link } from 'react-router-dom'

const AllNotes = () => {
    const { notes,deleteNote,togglePublished} = useNotes()


  return (
        <>

          {/* {JSON.stringify(notes)} */}
          <div className="col-sm-12 ">
              <div className="mb-3">
                  <h1>All Note ({notes && notes.length}) </h1>
              </div>

              <div className=" gap-5  d-flex flex-wrap mx-auto">
                 {
                      notes&&  notes.length>0 ?<>
                          {notes.map((cur: Note,i:number)=>{



                              return <div key={i} className="card col-sm-3">
                                  <div className="card-title">
                                      <p className="text-center h2">{cur.title}</p>
                                  </div>
                                  <hr />
                                  <div className="card-body">{cur.short_desc}</div>
                                  <p className="card-text">{cur.content}</p>
                                  <div className="card-footer d-flex">
                                      <button onClick={() => deleteNote(cur._id)} className='btn btn-danger  btn-sm mx-2 '>delete</button>
                                      <button onClick={() => togglePublished(cur._id)}  className={`btn ${cur.isPublish ? 'btn-danger' : 'btn-primary'}  btn-sm mx-2 `}>{cur.isPublish ? `Un-Publish` :'Publish'}</button>
                                      <Link to={`/update/${cur._id}`} className={`btn btn-secondary  btn-sm mx-2 `}>Update</Link>
                                  </div>
                              </div>
                          })}
                      </>:<>
                        currenly 0 Notes
                      </>
                 }
              </div>

          </div>
    </>
  )
}

export default AllNotes