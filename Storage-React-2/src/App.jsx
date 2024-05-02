import { useState } from 'react'


import TodoList from './components/TodoList'



function App() {
 
  return (
    <div className="container">
      <header>
        <h1>Control de Tareas</h1>
        <hr />
      </header>
      <TodoList/>
    </div>
  )
}

export default App
