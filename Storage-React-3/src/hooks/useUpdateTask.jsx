import { useState } from "react";
import { updateTaskRequest } from "../services/api";

import toast from "react-hot-toast";

export const useUpdateTask = () => {
    const [updatedTask, setUpdatedTask] = useState(null)

    const updateTask = async (id, task) => {
        const response = await updateTaskRequest(id, task)

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

          
        setUpdatedTask(response.data)
        toast.success('¡Tarea actualizada correctamente!');
    }
    return {
        updatedTask,
        isFetching: !updatedTask,
        updateTask
    }
}

