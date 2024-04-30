import { useState } from 'react'


import TodoList from './components/TodoList'
import useLocalStorage from './hooks/useLocalStorage'


function App() {
  const [tasks, setTasks] = useLocalStorage('react-todo.tasks', []);
  const [previousFocusEl, setPreviousFocusEl] = useState(null);
  const [editedTask, setEditedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);


  return (
    <div className="container">
      <header>
        <h1>Control de Tareas</h1>
        <hr />
      </header>
      <TodoList />
    </div>
  )
}

export default App
