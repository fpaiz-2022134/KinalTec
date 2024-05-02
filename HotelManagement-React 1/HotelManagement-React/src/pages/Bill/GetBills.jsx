import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const GetBills = () => {
  const [bills, setBills] = useState([{}]);


  const getBills = async () => {
    try {
      const { data } = await axios.get("http://localhost:2880/bill/get");
      if (data.bills) {
        setBills(data.bills);
      }
    } catch (err) {
      console.log(err);
      throw new Error(err.response.message || "Error getting bills");
    }
  };

  useEffect(() => {
    getBills();
  }, []);

  return (
    <>
      <div className="container">
        <h1> Get Bills</h1>
        <Link to={"add"}>
          <button className="btn btn-danger">Add</button>
        </Link>
        <div className="d-flex flex-wrap">
        {bills.map(({ _id, NIT, invoiceDetail, date, Total }, i) => (          
          <>
            <div
              className="card border-info mb-3 d-inline-flex p-3 m-3"
              style={{ maxWidth: "18rem" }}
            >
              <div className="card-header">{NIT}</div>
              <div className="card-body">
                <h5 className="card-title">Date: {date}</h5>
                <h5 className="card-title">Total: {Total}</h5>
                <div className="card-body">
                  <Link to={`update/${_id}`}>
                    <button className="btn btn-warning">+Actualizar</button>
                  </Link>
                  <Link to={`get/${_id}`}>
                    <button className="btn btn-info">See details</button>
                  </Link>                  
                </div>
              </div>
            </div>
          </>
        ))}
        </div>
      </div>
    </>
  );
};
