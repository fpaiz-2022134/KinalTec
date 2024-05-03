import { useState } from 'react'


import TodoList from './components/TodoList'
import { routes } from './routes'
import { useRoutes } from 'react-router-dom'


function App() {
  const elementRoutes = useRoutes(routes)
  return (
    <>
      {elementRoutes}  
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
