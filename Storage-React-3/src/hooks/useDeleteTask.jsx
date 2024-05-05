import { deleteTaskRequest } from "../services/api";

import toast from "react-hot-toast";

export const useDeleteTask = () => {
    const deleteTask = async (id) => {
        const response = await deleteTaskRequest(id)
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
                'Error al eliminar la tarea, intenta de nuevo.'
              )
          }
          console.log(response)
    }

    return {
        deleteTask
    }
}
