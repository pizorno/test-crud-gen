import React from 'react'
import AddNotes from './components/AddNotes'
import AllNotes from './components/AllNotes'

const App = () => {
  return (
    <>
        <div className="container py-5">
              <AddNotes/>
              <AllNotes/>
        </div>
    </>
  )
}

export default App