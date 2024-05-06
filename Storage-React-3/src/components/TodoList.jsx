import { useState, useEffect } from 'react'
import "./TodoList.css"
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Input } from './Input';
import { Link } from 'react-router-dom';
import { TaskPage } from '../pages/TaskPage'

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

        <div className='container-btn'>
        <button
          disabled={isSubmitButtonDisable}
        >
          Crear
        </button>
        <Link to="/taskPage/tasks">
          <button >Mis tareas</button>
        </Link>
        </div>
      </form>
    </div>


  )

}

export default TodoList;

