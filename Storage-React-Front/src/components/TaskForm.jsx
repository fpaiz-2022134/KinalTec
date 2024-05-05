import { useState } from "react"
import { useSaveTask } from "../shared/hooks/useSaveTask"
import "./TaskForm.css"
const img = 'https://cdn-icons-png.flaticon.com/512/6320/6320522.png'

export const TaskForm = () => {
    const { isLoading, saveTask } = useSaveTask()
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        taskName: '',
        taskDescription: '',
        entryDate: '',
        departureDate: ''
    })

    const handleChange = (e) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name]: e.target.value
            }
        ))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        saveTask(formData)
    }


    return (
        <>
            <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
                <div>
                    <img src={img} style={{ width: '8em', height: 'auto' }} />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nombre del creador</label>
                        <input value={formData.name} onChange={handleChange} name="name" type="text" className="form-control" id="name" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="surname" className="form-label">Apellido del creador</label>
                        <input value={formData.surname} onChange={handleChange} name="surname" type="text" className="form-control" id="surname" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="taskName" className="form-label">Nombre de la tarea</label>
                        <input value={formData.taskName} onChange={handleChange} name="taskName" type="text" className="form-control" id="taskName" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="taskDescription" className="form-label">Descripción</label>
                        <textarea value={formData.taskDescription} onChange={handleChange} name="taskDescription" type="text" className="form-control" id="taskDescription" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="entryDate" className="form-label">Fecha final</label>
                        <input value={formData.entryDate} onChange={handleChange} name="entryDate" type="date" className="form-control" id="entryDate" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="departureDate" className="form-label">Fecha final</label>
                        <input value={formData.departureDate} onChange={handleChange} name="departureDate" type="date" className="form-control" id="departureDate" />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary">Crear</button>
                    </div>
                </form>
            </div>
        </>
    )
}