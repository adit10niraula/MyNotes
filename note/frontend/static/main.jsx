import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import Note from './pages/note.jsx'

const router = createBrowserRouter([
  {path: '/', element: <App/>},
  {path: '/note/:id', element: <Note/>}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
   
  </React.StrictMode>,
)
