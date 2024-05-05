import './Tasks.css'

import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useChangeStatus } from '../hooks/useChangeStatus';
import { useUpdateTask } from "../hooks/useUpdateTask"
import { useDeleteTask } from '../hooks/useDeleteTask';



export const Task = ({ tasks = [] }) => {

  const { statusChanged, updateStatus } = useChangeStatus()
  const { updatedTask, isFetching, updateTask } = useUpdateTask()
  const { deleteTask } = useDeleteTask()

  const [task, setTask] = useState(

    {
      id: '',
      name: '',
      surname: '',
      taskName: '',
      taskDescription: '',
      entryDate: '',
      departureDate: '',
      status: ''
    }


  )

  //Fomato de fechas
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())}`;
  };

  const padZero = (num) => {
    return (num < 10 ? '0' : '') + num;
  };

  const handleChange = (e) => {
    setTask((prevData) => (
      {
        ...prevData,
        [e.target.name]: e.target.value
      }
    ))
  }

  const getTask = (task) => {
    setTask(task)
  }

  const update = () => {
    updateTask(task.id, task)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error updating task:', error);
      });
  }

  const deleteT = (id) => {
    deleteTask(id)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error updating task:', error);
      });
  }

  const changeStatus = (id) => {
    updateStatus(id)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error updating task:', error);
      });
  }
  return (
    <div className="task-container">
      <h2 className="task-title">My Tasks</h2>
      <Link to="/localStorage" className="add-task-btn">Agregar Tarea</Link>
      <div className="task-list">
        {tasks.map(task => (
          <div key={task.id} className="task-card">
            <h5 className="task-card-title">{task.taskName}
            </h5>
            <div className="task-card-body">
              <p className="task-card-text">{task.taskDescription}</p>
              <p className="task-card-text">Entry Date: {formatDate(task.entryDate)}</p>
              <p className="task-card-text">Departure Date: {formatDate(task.departureDate)}</p>
              <p className="task-card-text-user">Creador: {task.name} {task.surname}</p>
              <div className="task-card-buttons">
                <button className="task-card-button">
                  <svg onClick={() => getTask(task)} data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                  </svg>
                </button>
                <button className="task-card-button">
                  <svg onClick={() => deleteT(task.id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                  </svg>
                </button>
                <button className="task-card-button" onClick={() => changeStatus(task.id)} >
                  {task.status ? "Realizado" : "No realizado"}
                </button>
              </div>
            </div>
          </div>
        ))}




      </div>
      {/* SIDEBAR */}
      <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">Actualiza tu Tarea</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <div className="m-3">
            <label htmlFor="" className="form-label">Nombre del creador</label>
            <input value={task.name} onChange={handleChange} name="name" className="form-control" type="text" />
          </div>
          <div className="m-3">
            <label htmlFor="" className="form-label">Nombre del creador</label>
            <input value={task.surname} onChange={handleChange} name="surname" className="form-control" type="text" />
          </div>
          <div className="m-3">
            <label htmlFor="" className="form-label">Tarea</label>
            <input value={task.taskName} onChange={handleChange} name="taskName" className="form-control" type="text" />
          </div>
          <div className="m-3">
            <label htmlFor="">Descripción</label>
            <textarea value={task.taskDescription} onChange={handleChange} name="taskDescription" className="form-control" type="text" />
          </div>
          <div className="m-3">
            <label htmlFor="">Fecha de Inicio</label>
            <input value={formatDate(task.entryDate)} onChange={handleChange} name="entryDate" className="form-control" type="date" />
          </div>
          <div className="m-3">
            <label htmlFor="">Fecha Final</label>
            <input value={formatDate(task.departureDate)} onChange={handleChange} name="departureDate" className="form-control" type="date" />
          </div>

          <div className="m-3 justify-content-center d-flex">
            <button onClick={update} className="btn btn-success">Update</button>
          </div>
        </div>
      </div>
    </div>
  )
}