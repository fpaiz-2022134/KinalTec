import { useState } from 'react'
import { createTask as createTaskService, updateTask as updateTaskService, deleteTask as deleteTaskService,
   getTasks as getTasksService } from '../services/api.js'
import toast from 'react-hot-toast'

export const useLocalStorage = () => {
  const [isLoading, setIsLoading] = useState(false)

  const saveTask = async (name, surname, taskName, taskDescription, entryDate, departureDate) => {
    setIsLoading(true)
    const task = {
      taskName,
      taskDescription,
      entryDate,
      departureDate,
      name,
      surname
    }
    const response = await createTaskService(task)
    setIsLoading(false)
    if (response.error) {
      if (response?.err?.response?.data?.errors) {
        let arr = response?.err?.response?.data?.errors
        for (const error of arr) {
          return toast.error(error.msg)
        }
      }
      return toast.error(
        response?.err?.response?.data?.msg ||
        response?.err?.data?.msg ||
        'Error al agregar tu tarea, intenta de nuevo.'
      )
    }
    console.log(response)
  }

  const updateTaskFunc = async (taskId, updates) => {
    setIsLoading(true)
    const response = await updateTaskService(taskId, updates)
    setIsLoading(false)
    if (response.error) {
      if (response?.err?.response?.data?.errors) {
        let arr = response?.err?.response?.data?.errors
        for (const error of arr) {
          return toast.error(error.msg)
        }
      }
      return toast.error(
        response?.err?.response?.data?.msg ||
        response?.err?.data?.msg ||
        'Error al actualizar tu tarea, intenta de nuevo.'
      )
    }
    console.log(response)
  }

  const deleteTaskFunc = async (taskId) => {
    // Implementa la lógica para eliminar la tarea utilizando la función deleteTaskService
  }


  const getTasks = async () => {
    setIsLoading(true);
    try {
      const response = await getTasksService();
      setIsLoading(false);
      return response.data; // Suponiendo que la respuesta contiene un campo 'data' que contiene las tareas
    } catch (error) {
      setIsLoading(false);
      // Manejar el error
      console.error("Error al obtener las tareas:", error);
      toast.error('Error al obtener las tareas, intenta de nuevo.');
      return [];
    }
  };

  return {
    saveTask,
    updateTask: updateTaskFunc,
    deleteTask: deleteTaskFunc,
    getTasks,
    isLoading
  }
}