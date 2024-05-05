import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createTask } from "../../services/api"

export const useSaveTask = () => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const saveTask = async(task)=>{
        setIsLoading(true)
        const response = await createTask(task)
        setIsLoading(false)
        if(response.error){
            return alert('Error al guardar el task')
        }
        navigate('/storage/tasks')
    }
    

  return {
    isLoading,
    saveTask
  }
}