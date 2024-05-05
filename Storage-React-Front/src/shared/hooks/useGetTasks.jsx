import { useState } from "react"
import { getTasksRequest } from "../../services/api"

export const useGetTasks = () => {
    const [tasks, setTasks] = useState(null)

    const getTasks = async()=>{
        const response = await getTasksRequest()
        if(response.error){
            alert(
                response.err.response.data.message ||
                'Error al obtener los tasks'
            )
        }
        setTasks(response.data)
    }
  return {
    tasks,
    isFetching: !tasks,
    getTasks
  }
}