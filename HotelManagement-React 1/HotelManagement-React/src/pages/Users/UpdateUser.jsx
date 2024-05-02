import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export const UpdateUser = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const { _id } = useParams();

    const getUser = async () => {
        try {
            const { data } = await axios.get(`http://localhost:2880/user/get`)
            if (data.user) {
                console.log(data.user)
                setUser(data.user)
            }
        } catch (err) {
            console.log(err);
            throw new Error(err.response.message || data, "Error getting users");
        }

    };

    const updateUser = async (e) => {
        try {
            e.preventDefault();
            let updateUser = {
                name: document.getElementById('inputName').value,
                surname: document.getElementById('inputSurname').value,
                email: document.getElementById('inputEmail').value,
                username: document.getElementById('inputUsername').value,
                password: document.getElementById('inputPassword').value,
                phone: document.getElementById('inputPhone').value,
                role: document.getElementById('inputRole').value

            }

            const { data } = await axios.put(`http://localhost:2880/user/update/${_id}`, updateUser)
            alert(data.message)
            navigate('/home/users')
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getUser();
    }, [])
    return (
        <>
            <h1 className='className="container d-flex justify-content-center align-items-center h-100"'>
                Update User
            </h1>
            <form className="m-5 text-center">
                <div className="mb-3">
                    <label htmlFor="inputName" className="form-label">Name</label>
                    <input type="text" className="form-control" id="inputName" defaultValue={user.name} />
                </div>
                <div>
                    <label htmlFor="inputSurname" className="form-label">Surname</label>
                    <input type="text" className="form-control" id="inputSurname" defaultValue={user.surname} />
                </div>
                <div>
                    <label htmlFor="inputEmail" className="form-label">Email</label>
                    <input type="text" className="form-control" id="inputEmail" defaultValue={user.email} />
                </div>
                <div>
                    <label htmlFor="inputUsername" className="form-label">Username</label>
                    <input type="text" className="form-control" id="inputUsername" defaultValue={user.email} />
                </div>
                <div>
                    <label htmlFor="inputPassword" className="form-label">Password</label>
                    <input type="text" className="form-control" id="inputPassword" defaultValue={user.age} />
                </div>
                <div>
                    <label htmlFor="inputPhone" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="inputPhone" defaultValue={user.phone}/>
                </div>
                <div>
                    <label htmlFor="inputRole" className="form-label">Role</label>
                    <input type="text" className="form-control" id="inputRole" defaultValue={user.phone}/>
                </div>

                <br></br>
                <button onClick={(e) => updateUser(e)} className="btn btn-success m-1">Update</button>
                <Link to="/home/users">
                    <button className="btn btn-danger m-1">Cancel</button>
                </Link>
            </form>
        </>
    )
}
