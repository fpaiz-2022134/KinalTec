import { Route, Routes } from "react-router-dom"

import { Task } from "./Tasks"

import { useGetTasks } from "../hooks/useGetTasks"

import { useEffect } from "react"

import { ClockLoader } from "react-spinners"

export const GetTasks = () => {
    const { tasks, getTasks, isFetching } = useGetTasks()

    useEffect(() => {
        getTasks()
    }, [])

    if (isFetching) {
        return (
            <div className="container d-flex align-items-center justify-content-center vh-100">
                <ClockLoader />
            </div>
        )
    }

    return (
        <div>
            <Routes>
                <Route path="tasks" element={<Task tasks={tasks} />} />
            </Routes>
        </div>


    )
}