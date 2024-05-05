import { useState } from "react";

import { getTasksRequest } from "../services/api";

export const useGetTasks =()=>{
    const [tasks, setTasks] = useState(null)

    const getTasks = async () => {
        const response = await getTasksRequest()

        if(response.error){
            if(response?.err?.response?.data?.errors){
              let arr = response?.err?.response?.data?.errors
              for (const error of arr) {
                return toast.error(
                  error.msg
                )
              }
            }
              return toast.error(
                response?.err?.response?.data?.msg ||
                response?.err?.data?.msg ||
                'Error al registrar el usuario, intenta de nuevo.'
              )
          }
          console.log(response)
          
        setTasks(response.data.tasks)
    }

    return {
        tasks,
        isFetching: !tasks,
        getTasks
    }
}
