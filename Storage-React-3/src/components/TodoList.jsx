import { useState, useEffect } from 'react'
import "./TodoList.css"
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Input } from './Input';


const TodoList = () => {

  const { saveTask, /* updateTask, getTasks, deleteTask, */ isLoading } = useLocalStorage()
  const [formData, setFormData] = useState(
    {

      name: {
        value: '',
        isValid: false,
        showError: false
      },
      surname: {
        value: '',
        isValid: false,
        showError: false
      },
      taskName: {
        value: '',
        isValid: false,
        showError: false
      },

      taskDescription: {
        value: '',
        isValid: false,
        showError: false
      },
      taskStartDate: {
        value: '',
        isValid: false,
        showError: false
      },
      taskEndDate: {
        value: '',
        isValid: false,
        showError: false
      }

    }
  )

 
  const onValueChange = (value, field) => {
    setFormData((prevData) => (
      {
        ...prevData,
        [field]: {
          ...prevData[field],
          value
        }
      }
    ))
  }

  const handleValidationOnBlur = (value, field) => {
    let isValid = false
    switch (field) {
      case 'name':
        isValid = value.length > 0
        break
      case 'surname':
        isValid = value.length > 0
        break
      case 'taskName':
        isValid = value.length > 0
        break
      case 'taskDescription':
        isValid = value.length > 0
        break
      case 'taskStartDate':
        isValid = value.length > 0
        break
      case 'taskEndDate':
        isValid = value.length > 0
        break

      default:
        break
    }

    setFormData((prevData) => (
      {
        ...prevData,
        [field]: {
          ...prevData[field],
          isValid,
          showError: !isValid
        }
      }
    ))

  }

  const handleToDoList = async (e) => {
    e.preventDefault()
    saveTask(
      formData.name.value,
      formData.surname.value,
      formData.taskName.value,
      formData.taskDescription.value,
      formData.taskStartDate.value,
      formData.taskEndDate.value,

    )
   
    // Reset form data
    setFormData({
      name: { value: '', isValid: false, showError: false },
      surname: { value: '', isValid: false, showError: false },
      taskName: { value: '', isValid: false, showError: false },
      taskDescription: { value: '', isValid: false, showError: false },
      taskStartDate: { value: '', isValid: false, showError: false },
      taskEndDate: { value: '', isValid: false, showError: false }
    });
  }

  const isSubmitButtonDisable =
    !formData.name.isValid ||
    !formData.surname.isValid ||
    !formData.taskName.isValid ||
    !formData.taskDescription.isValid ||
    !formData.taskStartDate.isValid ||
    !formData.taskEndDate.isValid


  return (
    <div className='root'>
      <h1> Crear tu tarea</h1>
      <form onSubmit={handleToDoList}>
        <Input
          field='name'
          label='Nombre del creador'
          type='text'
          value={formData.name.value}
          onChangeHandler={onValueChange}
          onBlurHandler={handleValidationOnBlur}
          showErrorMessage={formData.name.showError}
        /* validationMessage={emailValidationMessage}  */
        />
        <Input
          field='surname'
          label='Apellido del creador'
          type='text'
          value={formData.surname.value}
          onChangeHandler={onValueChange}
          onBlurHandler={handleValidationOnBlur}
          showErrorMessage={formData.surname.showError}
        /* validationMessage={emailValidationMessage}  */
        />
        <Input
          field='taskName'
          label='Nombre de la Tarea'
          type='text'
          value={formData.taskName.value}
          onChangeHandler={onValueChange}
          onBlurHandler={handleValidationOnBlur}
          showErrorMessage={formData.taskName.showError}
        /* validationMessage={emailValidationMessage}  */
        />
        <Input
          field='taskDescription'
          label='Descripción'
          type='text'
          value={formData.taskDescription.value}
          onChangeHandler={onValueChange}
          onBlurHandler={handleValidationOnBlur}
          showErrorMessage={formData.taskDescription.showError}
        /* validationMessage={emailValidationMessage}  */
        />
        <Input
          field='taskStartDate'
          label='Fecha de inicio'
          type='date'
          value={formData.taskStartDate.value}
          onChangeHandler={onValueChange}
          onBlurHandler={handleValidationOnBlur}
          showErrorMessage={formData.taskStartDate.showError}
        /* validationMessage={emailValidationMessage}  */
        />
        <Input
          field='taskEndDate'
          label='Fecha final'
          type='date'
          value={formData.taskEndDate.value}
          onChangeHandler={onValueChange}
          onBlurHandler={handleValidationOnBlur}
          showErrorMessage={formData.taskEndDate.showError}
        /* validationMessage={emailValidationMessage}  */
        />

        <button
          disabled={isSubmitButtonDisable}
        >
          Crear
        </button>


        


      </form>



      {/* <div>
        <ul>
          {getTasks().map((task, index) => (
            <li key={index}>
              <div>
                {task.name}
                {task.surname}
                {task.taskName}
                {task.taskDescription}
                {task.taskStartDate}
                {task.taskEndDate}
                {/* <button onClick={() => handleDelete(index)}>Eliminar</button>
                <button onClick={() => handleEdit(index, task)}>Editar</button> }
              </div>
            </li>
          ))}
        </ul>
      </div> */}
    </div>
   
    
  )

}

export default TodoList;




/* 
function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [inputTask, setInputTask] = useState({ name: '', description: '', startDate: '', endDate: '', addedBy: '' })
  const [editingIndex, setEditingIndex] = useState(-1)

  const handleChange = e => {
    const { name, value } = e.target
    setInputTask(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (editingIndex === -1) {
      setTasks([...tasks, inputTask])
    } else {
      const newTasks = [...tasks]
      newTasks[editingIndex] = inputTask
      setTasks(newTasks)
      setEditingIndex(-1)
    }
    setInputTask({ name: '', description: '', startDate: '', endDate: '', addedBy: '' })
  }

  const handleEdit = (index, task) => {
    setEditingIndex(index);
    setInputTask(task);
  }

  const handleDelete = index => {
    setTasks(tasks.filter((task, i) => i !== index))
  }

  const handleCheckbox = index => {
    setTasks(tasks.map((task, i) => i === index ? {...task, completed: !task.completed} : task))
  }

  return (
    <div>
      <h1>Crea una nueva Tarea</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Tarea:
          <input type="text" name="name" value={inputTask.name} onChange={handleChange} />
        </label>
        <label>
          Descripción:
          <input type="text" name="description" value={inputTask.description} onChange={handleChange} />
        </label>
        <label>
          Fecha De Inicio:
          <input type="date" name="startDate" value={inputTask.startDate} onChange={handleChange} />
        </label>
        <label>
          Fecha De Cierre:
          <input type="date" name="endDate" value={inputTask.endDate} onChange={handleChange} />
        </label>
        <label>
          Nombre Del Creador:
          <input type="text" name="addedBy" value={inputTask.addedBy} onChange={handleChange} />
        </label>
        <button type="submit">{editingIndex === -1 ? 'Agregar' : 'Guardar'}</button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <div>
              <input type="checkbox" checked={task.completed} onChange={() => handleCheckbox(index)} />
              <span style={task.completed ? { textDecoration: 'line-through' } : {}}>{task.name}</span>
            </div>
            <div>
              <p>Descripción: {task.description}</p>
              <p>Fecha De Inicio: {task.startDate}</p>
              <p>Fecha De Cierre: {task.endDate}</p>
              <p>Nombre Del Creador: {task.addedBy}</p>
            </div>
            <div>
              <button onClick={() => handleDelete(index)}>Eliminar</button>
              <button onClick={() => handleEdit(index, task)}>Editar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList
 */