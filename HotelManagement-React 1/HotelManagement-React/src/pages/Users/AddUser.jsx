import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const AddUser = () => {
    const navigate = useNavigate()

    const addUser = async (e) => {
        try {
            e.preventDefault();
            let user = {
                name: document.getElementById('inputName').value,
                surname: document.getElementById('inputSurname').value,
                email: document.getElementById('inputEmail').value,
                password: document.getElementById('inputPassword').value,
                phone: document.getElementById('inputPhone').value,
                role: document.getElementById('inputRole').value,
            }
            const { data } = await axios.post('http://localhost:2880/user/register', user)
            alert(data.message)
            clear();
            navigate('/home/users')
        } catch (err) {
            alert(err.response.data.message)
        }
    }

    const clear = async () => {
        try {
            document.getElementById('inputName').value = '',
                document.getElementById('inputSurname').value = '',
                document.getElementById('inputEmail').value = '',
                document.getElementById('inputPassword').value = '',
                document.getElementById('inputPhone').value = '',
                document.getElementById('inputRole').value = ''
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <h1>Agregar User</h1>
            <form className="m-5 text-center">
                <div className="mb-3">
                    <label htmlFor="inputName" className="form-label">Name</label>
                    <input type="text" className="form-control" id="inputName" required />
                </div>
                <div>
                    <label htmlFor="inputSurname" className="form-label">Surname</label>
                    <input type="text" className="form-control" id="inputSurname" required />
                </div>
                <div>
                    <label htmlFor="inputEmail" className="form-label">Email</label>
                    <input type="text" className="form-control" id="inputEmail" required />
                </div>
                <div>
                    <label htmlFor="inputPassword" className="form-label">Password</label>
                    <input type="text" className="form-control" id="inputPassword" required />
                </div>
                <div>
                <div>
                    <label htmlFor="inputPhone" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="inputPhone" required />
                </div>
                    <label htmlFor="inputRole" className="form-label">Role</label>
                    <input type="text" className="form-control" id="inputRole" required />
                </div>
         


                <br></br>

                <button onClick={(e) => addUser(e)} className="btn btn-success m-1">Create</button>

                <Link to="/home/users">
                    <button className="btn btn-danger m-1">Cancel</button>
                </Link>
            </form>
        </>
    )
}
