import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const GetInvoicesDetails = () => {
  const [invoicesdetails, setInvoicesDetails] = useState([{}]);

  const headers = {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token"),
  };

  const getInvoicesDetails = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:2880/invoicedetail/get",
        {
          headers: headers,
        }
      );
      if (data.invoiceDetails) {
        setInvoicesDetails(data.invoiceDetails);
        console.log(data.invoiceDetails);
      }
    } catch (err) {
      console.log(err);
      throw new Error(err.response.message || "Error getting invoices details");
    }
  }

  const deleteInvoiceDetail = async (id) => {
    try {
      let confirmDelete = confirm(
        `Estas seguro de eliminar este invoice detail`
      );
      if (confirmDelete) {
        const { data } = await axios.delete(
          `http://localhost:2880/invoicedetail/delete/${id}`
        );
        getInvoicesDetails();
        alert(`${data.message}`);
      }
    } catch (err) {
      console.log(err);
      throw new Error(err.response.message || "Error deleted invoices details");
    }
  };

  useEffect(() => {
    getInvoicesDetails();
  }, []);

  return (
    <>
      <div className="container">
        <div>
          <h1> Get Invoices Details </h1>
          <Link to={"add"}>
            <button className="btn btn-danger">+Add</button>
          </Link>
          <div className="d-flex flex-wrap">
            {invoicesdetails.map(({ _id, booking, subTotalAccount }, i) => (
              <>
                <div
                  className="card border-info mb-3 d-inline-flex p-3 m-3"
                  style={{ maxWidth: "18rem" }}
                >
                  <div className="card-header">{booking}</div>
                  <div className="card-body">
                    <Link
                      to={`additionalservices/${_id}`}
                      className="btn btn-info"
                    >
                      <p className="card-text">Servicios</p>
                    </Link>
                    <Link to={`events/${_id}`} className="btn btn-info">
                      <p className="card-text">Eventos</p>
                    </Link>
                    <h5 className="card-title">Total: {subTotalAccount}</h5>
                    <div className="card-body">
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteInvoiceDetail(_id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};