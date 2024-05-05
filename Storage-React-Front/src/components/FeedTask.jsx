import { Route, Routes } from "react-router-dom"
 import { Task } from "./Task" 
import { useGetTasks } from "../shared/hooks/useGetTasks"
import { useEffect } from "react"
import { ClockLoader } from "react-spinners"
import { TaskForm } from "./TaskForm"

export const FeedTask = () => {
    const { tasks, getTasks, isFetching } = useGetTasks()

    useEffect(()=>{
        getTasks()
    }, [])

    if(isFetching){
        return ( 
            <div className="container d-flex align-items-center justify-content-center vh-100">
              <ClockLoader />
            </div>
        )
    }

  return (
    <div>
        <Routes>
            <Route path="newTask" element={<TaskForm />} />
             <Route path="tasks" element={<Task tasks={tasks} />} /> 
        </Routes>
    </div>
  )
}