import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export const Update = () => {
    const navigate = useNavigate();
    const  [service, setService ] = useState({});
    const { _id } = useParams();


    const getService = async()=>{
        try{
          const { data } = await axios.get(`http://localhost:2880/service/get/${_id}`)
          if (data.service) {
            console.log(data.service, 'xxx')
            setService(data.service)
            }
        }catch(err){
          console.error(err);
          throw new Error(err.response.message || data, "Error getting service");
        }
    }


    const updateService = async (e) => {
        try {
            e.preventDefault();
            let updateService = {
                name: document.getElementById('inputName').value,
                description: document.getElementById('inputDescription').value,
                price: document.getElementById('inputPrice').value
            }

            const { data } = await axios.put(`http://localhost:2880/service/update/${_id}`, updateService)
            alert(data.message)
            navigate('/home/services')
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getService();
      }, [])

    return (
        <>
            <h1>Update Service</h1>
            <form className="m-5 text-center">
                <div className="mb-3">
                    <label htmlFor="inputName" className="form-label">Name</label>
                    <input type="text" className="form-control" id="inputName" defaultValue={service.name} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputDescription" className="form-label">Description</label>
                    <input type="text" className="form-control" id="inputDescription" defaultValue={service.description} required />
                </div>
                <div>
                    <label htmlFor="inputPrice" className="form-label">Price</label>
                    <input type="Number" className="form-control" id="inputPrice" defaultValue={service.price} required />
                </div>
                <br></br>
                <button onClick={(e) => updateService(e)} className="btn btn-success m-1">Update</button>
                <Link to="/home/services">
                    <button className="btn btn-danger m-1">Cancel</button>
                </Link>
            </form>
        </>
    )
}
