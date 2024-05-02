import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export const UpdateRoom = () => {
    const [room, setRoom] = useState({});
    const navigate = useNavigate();
    const { _id } = useParams();

    const getRoom = async () => {
        try {
            const { data } = await axios.get(`http://localhost:2880/room/get-id//update/${_id}`)
            if (data.room) {
                console.log(data.room, 'xxx')
                setRoom(data.room)
            }
        } catch (err) {
            console.log(err);
            throw new Error(err.response.message || data, "Error getting rooms");
        }

    };

    const updateRoom = async (e) => {
        try {
            e.preventDefault();
            let updateRoom = {
                numberRoom: document.getElementById('inputNO').value,
                amountPeople: document.getElementById('inputAP').value,
                price: document.getElementById('inputPrice').value,
                status: document.getElementById('inputStats').value
            }

            const { data } = await axios.put(`http://localhost:2880/room//update/${_id}`, updateRoom)
            alert(data.message)
            navigate('/home/rooms')
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getRoom();
    }, [])
    return (
        <>
            <h1 className='className="container d-flex justify-content-center align-items-center h-100"'>
                Update Room
            </h1>
            <form className="m-5 text-center">
                <div className="mb-3">
                    <label htmlFor="inputNO" className="form-label">Number Room</label>
                    <input type="number" className="form-control" id="inputNO" defaultValue={room.numberRoom} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputAP" className="form-label">AmounPeople</label>
                    <input type="number" className="form-control" id="inputAP" defaultValue={room.amountPeople} required />
                </div>
                <div>
                    <label htmlFor="inputPrice" className="form-label">Price</label>
                    <input type="number" className="form-control" id="inputPrice" defaultValue={room.price} required />
                </div>
                <div>
                    <label htmlFor="inputStats" className="form-label">Status</label>
                    <input type="number" className="form-control" id="inputStats" defaultValue={room.status} required />
                </div>
                <br></br>
                <button onClick={(e) => updateRoom(e)} className="btn btn-success m-1">Update</button>
                <Link to="/home/rooms">
                    <button className="btn btn-danger m-1">Cancel</button>
                </Link>
            </form>
        </>
    )
}
