import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import NotesProvider from './context/Notes.context'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UpdatePage from './Update/index.tsx'


const routes = createBrowserRouter([
  {
    path:'/',
    Component:App,
  },
  {
    path: '/update/:id',
    Component: UpdatePage,
  }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <NotesProvider>
    {/* <App /> */}
    <RouterProvider router={routes} />
  </NotesProvider>,
)
