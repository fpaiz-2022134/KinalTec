import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const AddEvent = () => {
    const navigate = useNavigate()


    const addEvent= async (e) => {
        try {
            e.preventDefault();
            let event = {
                name: document.getElementById('inputName').value,
                event_type: document.getElementById('inputEvent_Type').value,
                price: document.getElementById('inputPrice').value
            }
            const { data } = await axios.post('http://localhost:3000/event/add', event)
            alert(data.message)
            resetAdd()
            navigate('/home/events')
        } catch (err) {
            alert(err.response.data.message)
        }
    }


    const resetAdd = async () => {
        try {
            document.getElementById('inputName').value = '',
                document.getElementById('inputEvent_Type').value = '',
                document.getElementById('inputPrice').value = ''
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <h1 className="text-center">Agregar Events</h1>
            <form className="m-5 text-center">
                <div className="mb-3">
                    <label htmlFor="inputName" className="form-label">Name</label>
                    <input type="text" className="form-control" id="inputName" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputEvent_Type" className="form-label">Event Type</label>
                    <input type="text" className="form-control" id="inputEvent_Type" required />
                </div>
                <div>
                    <label htmlFor="inputPrice" className="form-label">Price</label>
                    <input type="Number" className="form-control" id="inputPrice" required />
                </div>
                <br></br>

                <button onClick={(e) => addEvent(e)} className="btn btn-success m-1">ADD</button>

                <Link to="/home/events">
                    <button className="btn btn-danger m-1">Cancel</button>
                </Link>
            </form>
        </>
    )
}
