import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const AddBill = () => {
  const [invoiceDetail, setInvoiceDetail] = useState([]);
  const navigate = useNavigate()

  //-------------------------Mostrar input
  const getInvoicesDetails = async () => {
    try {
      const { data } = await axios(
        "http://localhost:3000/invoicedetail/getdisused"
      );
      if (data.unusedInvoiceDetails) {
        setInvoiceDetail(data.unusedInvoiceDetails);
      }
    } catch (err) {
      console.log(err);
      throw new Error(
        err.response.message || "Error getting invoices details disused"
      );
    }
  };

  //-------------------------Mostrar input
  const addBill = async(e)=>{
    try{
        e.preventDefault();
        let form = {
            NIT: document.getElementById("inputNIT").value,
            invoiceDetail: document.getElementById("inputInvoicesDetails").value
        }
        const { data } = await axios.post("http://localhost:3000/bill/add", form)
        if(data.message){
            alert(data.message)
            navigate("/home/bill")
        }
    }catch(err){
        console.log(err);
        alert(err.response?.data.message);
        throw new Error("Error in savid to bill");        
    }
  }
  
  useEffect(() => {
    getInvoicesDetails();
  }, []);

  return (
    <>
      <form className="container">
        <h2>Agregar Bill</h2>
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
        <div className="mb-3">
          <label htmlFor="inputInvoicesDetails" className="form-label">
            InvoicesDetails
          </label>
          <select className="form-control" id="inputInvoicesDetails">
            {invoiceDetail.map(({ _id, booking, subTotalAccount }, i) => {
              return (
                <option key={i} value={_id}>
                  {booking}
                  {subTotalAccount}
                </option>
              );
            })}
          </select>
        </div>
        <button
          onClick={(e) => addBill(e)}
          type="button"
          className="btn btn-primary btn-lg btn-block"
        >
          Agregar
        </button>

        <Link to={"/home/bill"}>
          <button type="button" className="btn btn-primary btn-lg btn-block">
            Cancelar
          </button>
        </Link>
      </form>
    </>
  );
};
