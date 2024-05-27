import { useState } from 'react'


import TodoList from './components/TodoList'
import { routes } from './routes'
import { useRoutes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

function App() {
  const elementRoutes = useRoutes(routes)
  return (
    <>
      {elementRoutes}  
      <Toaster position="bottom-right" reserveOrder={false}/>
       {/* <div className="container">
      <header>
        <h1>Control de Tareas</h1>
        <hr />
      </header>
      <TodoList/> 
    </div> */}s
    </>
    
  )
}

export default App
