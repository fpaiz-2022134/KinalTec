import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const UpdateInvoiceDetail = () => {
  const { _id } = useParams();
  const navigate = useNavigate()

  const [form, setForm] = useState({
    subTotalAccount: "",
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  const updateInvoiceDetail = async(e) =>{
    try{
        e.preventDefault()
        const { data } = await axios.put(`http://localhost:2880/invoicedetail/update/${_id}`, form)
        if(data.message) {
            alert(data.message)
            navigate("/home/invoicedetail")
        }
    }catch(err){
      console.log(err);
      alert(err.response?.data.message);
      throw new Error("Error in updated to invoice detail");
    }
  }
  return (
    <>
      <h1 className="text-center">Update invoice detail</h1>
      <form>
        <div className="container p-5 my-1">
          <div className="form-group">
            <label>subTotalAccount</label>
            <input
              onChange={handleChange}
              name="subTotalAccount"
              type="number"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="subTotalAccount"
            />
          </div>

          <button
            onClick={(e) => updateInvoiceDetail(e)}
            type="button"
            className="btn btn-primary btn-lg btn-block"
          >
            Actualizar
          </button>

          <Link to={"/home/invoicedetail"}>
            <button type="button" className="btn btn-primary btn-lg btn-block">
              Cancelar
            </button>
          </Link>
        </div>
      </form>
    </>
  );
};
