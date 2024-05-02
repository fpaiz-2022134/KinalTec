import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export const UpdateEvent = () => {
    const navigate = useNavigate();
    const [event, setEvent] = useState({});
    const { _id } = useParams();



    const getEvent = async () => {
        try {
            const { data } = await axios.get(`http://localhost:2880/event/get/${_id}`)
            if (data.event) {
                console.log(data.event, 'xxx')
                setEvent(data.event)
            }
        } catch (err) {
            console.error(err);
            throw new Error(err.response.message || data, "Error getting events");
        }
    }


    const updateEvent = async (e) => {
        try {
            e.preventDefault();
            let updateEvent = {
                name: document.getElementById('inputName').value,
                event_type: document.getElementById('inputEvent_Type').value,
                price: document.getElementById('inputPrice').value
            }
            const { data } = await axios.put(`http://localhost:2880/event/update/${_id}`, updateEvent)
            alert(data.message)
            navigate('/home/events')
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getEvent();
    }, [])


    return (
        <>
            <h1>Update Event</h1>
            <form className="m-5 text-center">
                <div className="mb-3">
                    <label htmlFor="inputName" className="form-label">Name</label>
                    <input type="text" className="form-control" id="inputName" defaultValue={event.name} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputEventType" className="form-label">Event Type</label>
                    <input type="text" className="form-control" id="inputEvent_Type" defaultValue={event.event_type} required />
                </div>
                <div>
                    <label htmlFor="inputPrice" className="form-label">Price</label>
                    <input type="Number" className="form-control" id="inputPrice" defaultValue={event.price} required />
                </div>
                <br></br>
                <button onClick={(e) => updateEvent(e)} className="btn btn-success m-1">Update</button>
                <Link to="/home/events">
                    <button className="btn btn-danger m-1">Cancel</button>
                </Link>
            </form>
        </>
    )
}
