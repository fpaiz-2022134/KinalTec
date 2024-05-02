import axios from "axios";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export const UpdateBill = () => {
  const navigate = useNavigate()
  const { _id } = useParams();

  const updateBill = async(e) =>{
    try{
        e.preventDefault();
        let form = {
            NIT: document.getElementById("inputNIT").value
        }
        const { data } = await axios.put(`http://localhost:3000/bill/update/${_id}`, form)
        if(data.message){
            alert(data.message)
            navigate("/home/bill")
        }
    }catch(err){
        console.log(err);
        alert(err.response?.data.message);
        throw new Error("Error in updated to bill");        
    }
  }

  return (
    <>
      <div className="container">
        <h1>Update Bill</h1>
        <form>
          <div className="container p-5 my-1">
            <div className="form-group">
              <label>NIT</label>
              <input
                id="inputNIT"
                name="NIT"
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="NIT"
              />
            </div>

            <button
              onClick={(e) => updateBill(e)}
              type="button"
              className="btn btn-primary btn-lg btn-block"
            >
              Actualizar
            </button>

            <Link to={"/home/bill"}>
              <button
                type="button"
                className="btn btn-primary btn-lg btn-block"
              >
                Cancelar
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};
