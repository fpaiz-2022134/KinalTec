import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const ADDR = () => {
    const navigate = useNavigate()

    const addRoom = async (e) => {
        try {
            e.preventDefault();
            let room = {
                numberRoom: document.getElementById('inputNO').value,
                amountPeople: document.getElementById('inputAP').value,
                typeRoom: document.getElementById('inputType').value,
                price: document.getElementById('inputPrice').value
            }
            const { data } = await axios.post('http://localhost:3000/room/add-room', room)
            alert(data.message)
            clear();
            navigate('/home/rooms')
        } catch (err) {
            alert(err.response.data.message)
        }
    }

    const clear = async () => {
        try {
            document.getElementById('inputNO').value = '',
                document.getElementById('inputAP').value = '',
                document.getElementById('inputType').value = '',
                document.getElementById('inputPrice').value = ''
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <h1 className="text-center">Agregar Rooms</h1>
            <form className="m-5 text-center">
                <div className="mb-3">
                    <label htmlFor="inputNO" className="form-label">Number Room</label>
                    <input type="number" className="form-control" id="inputNO" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputAP" className="form-label">AmounPeople</label>
                    <input type="number" className="form-control" id="inputAP" required />
                </div>
                <div>
                    <label htmlFor="inputType" className="form-label">Type Room</label>
                    <input type="text" className="form-control" id="inputType" required />
                </div>
                <div>
                    <label htmlFor="inputPrice" className="form-label">Price</label>
                    <input type="number" className="form-control" id="inputPrice" required />
                </div>
                <br></br>

                <button onClick={(e) => addRoom(e)} className="btn btn-success m-1">ADD</button>

                <Link to="/home/rooms">
                    <button className="btn btn-danger m-1">Cancel</button>
                </Link>
            </form>
        </>
    )
}
