import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const GetBill = () => {
  const { _id } = useParams();
  const [bill, setBill] = useState({});
  const [as, setAs] = useState([{}]);
  const [events, setEvents] = useState([{}])

  const getBill = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/bill/get/${_id}`);
      if (data.bill) {
        setBill(data.bill);
        setAs(data.bill.invoiceDetail.additionalServices);
        setEvents(data.bill.invoiceDetail.events)
      }
    } catch (err) {
      console.log(err);
      throw new Error(err.response.message || "Error getting bill");
    }
  };

  useEffect(() => {
    getBill();
  }, []);

  return (
    <>
      <h1 className="container">
        <Link to={"/home/bill"}>
          <button className="btn btn-info">Regresar</button>
        </Link>
        Get bill
      </h1>
      <div className="container">
        <div className="card abs-center" style={{ width: "80vw" }}>
          <div className="card-body">
            <h5 className="card-title">NIT: {bill.NIT}</h5>
            <p className="card-text">Date: {bill.date}</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <h6 className="container">Servicios</h6>
              {as.map(({ _id, name, description, price }, i) => (
                <>
                  <li className="list-group-item">
                    <p>{name}</p>
                    <p>{description}</p> 
                    <p>{price}</p>
                  </li>
                </>
              ))}
            </li>
            <li className="list-group-item">
              <h6 className="container">Eventos</h6>
              {events.map(({ _id, name, event_type, price }, i) => (
                <>
                  <li className="list-group-item">
                    <p>{name}</p>
                    <p>{event_type}</p> 
                    <p>{price}</p>
                  </li>
                </>
              ))}              
            </li>
          </ul>
          <div className="card-body">
            <h5 className="card-title">Total: {bill.Total}</h5>
          </div>
        </div>
      </div>
    </>
  );
};
