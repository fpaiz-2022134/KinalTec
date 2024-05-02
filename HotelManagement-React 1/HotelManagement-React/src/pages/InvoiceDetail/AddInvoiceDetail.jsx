import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const AddInvoiceDetail = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    booking: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addInvoiceDetail = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(
        "http://localhost:3000/invoicedetail/add",
        form
      );
      if(data.message) {
        alert(data.message)
        //cambiar de vista  
        navigate("/home/invoicedetail")
    }
    } catch (err) {
      console.log(err);
      alert(err.response?.data.message);
      throw new Error("Error in savid to invoice detail");
    }
  };

  return (
    <>
      <h1 className="text-center">Agregar invoice detail</h1>
      <form>
        <div className="container p-5 my-1">
          <div className="form-group">
            <label>Booking</label>
            <input
              onChange={handleChange}
              name="booking"
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="booking"
            />
          </div>

            <button
              onClick={(e) => addInvoiceDetail(e)}
              type="button"
              className="btn btn-primary btn-lg btn-block"
            >
              Agregar
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
