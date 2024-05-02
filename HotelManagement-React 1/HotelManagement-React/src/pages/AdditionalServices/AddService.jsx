import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Add = () => {
    const navigate = useNavigate()


    const addService = async (e) => {
        try {
            e.preventDefault();
            let service = {
                name: document.getElementById('inputName').value,
                description: document.getElementById('inputDescription').value,
                price: document.getElementById('inputPrice').value
            }
            const { data } = await axios.post('http://localhost:3000/service/add', service)
            alert(data.message)
            resetAdd()
            navigate('/home/services')
        } catch (err) {
            alert(err.response.data.message)
        }
    }


    const resetAdd = async () => {
        try {
            document.getElementById('inputName').value = '',
                document.getElementById('inputDescription').value = '',
                document.getElementById('inputPrice').value = ''
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <h1 className="text-center"> Agregar Service</h1>
            <form className="m-5 text-center">
                <div className="mb-3">
                    <label htmlFor="inputName" className="form-label">Name</label>
                    <input type="text" className="form-control" id="inputName" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputDescription" className="form-label">Description</label>
                    <input type="text" className="form-control" id="inputDescription" required />
                </div>
                <div>
                    <label htmlFor="inputPrice" className="form-label">Price</label>
                    <input type="Number" className="form-control" id="inputPrice" required />
                </div>
                <br></br>

                <button onClick={(e) => addService(e)} className="btn btn-success m-1">ADD</button>

                <Link to="/home/services">
                    <button className="btn btn-danger m-1">Cancel</button>
                </Link>
            </form>
        </>
    )
}
