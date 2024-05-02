import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const GetInvoiceDetailEvents = () => {
  const [events, setEvents] = useState([{}]);
  const [eventsNot, setEventsNot] = useState([{}]);
  const { _id } = useParams();

  //-------------------------Mostrar datos
  const getEvents = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:2880/invoicedetail/getevents/${_id}`
      );
      if (data.events) {
        setEvents(data.events);
      }
    } catch (err) {
      console.log(err);
      throw new Error(
        err.response.message || "Error getting event in the invoice detail"
      );
    }
  };

  const getEventsNot = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:2880/invoicedetail/geteventsnot/${_id}`
      );
      if (data.eventsNot) {
        setEventsNot(data.eventsNot);
      }
    } catch (err) {
      console.log(err);
      throw new Error(
        err.response.message || "Error getting events not on invoice detail"
      );
    }
  };

  //-------------------------Agregar o eliminar datos
  const addEvent = async (idEvent) => {
    try {
      let form = {
        event: idEvent,
      };
      const { data } = await axios.put(
        `http://localhost:2880/invoicedetail/addevent/${_id}`,
        form
      );
      if (data.message) {
        getEvents();
        getEventsNot();
      }
    } catch (err) {
      console.log(err);
      throw new Error(
        err.response.message ||
          "Error saved additional services in the invoice detail"
      );
    }
  };

  const deleteEvent = async (idEvent) => {
    try {
      let form = {
        event: idEvent,
      };
      const { data } = await axios.put(
        `http://localhost:2880/invoicedetail/deleteevent/${_id}`,
        form
      );
      if (data.message) {
        getEventsNot();
        getEvents();
      }
    } catch (err) {
      console.log(err);
      throw new Error(
        err.response.message ||
          "Error deleted additional services in the invoice detail"
      );
    }
  };

  useEffect(() => {
    getEvents();
    getEventsNot();
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="container">
          <Link to={"/home/invoicedetail"} className="btn btn-info">
            Regresar
          </Link>
          Events
        </h1>
      </div>

      <div className="container">
        <h2> My events </h2>
        <div className="d-flex flex-wrap">
          {events.map(({ _id, name, event_type, price }, i) => (
            <>
              <div
                className="card border-info mb-3 d-inline-flex p-3 m-3"
                style={{ maxWidth: "18rem" }}
              >
                <div className="card-header">{name}</div>
                <div className="card-body">
                  <p className="card-text">{event_type}</p>
                  <h5 className="card-title">{price}</h5>
                  <button
                    onClick={() => deleteEvent(_id)}
                    className="btn btn-danger"
                  >
                    Quitar
                  </button>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>

      <div className="container">
        <h2> Events </h2>
        <div className="d-flex flex-wrap">
          {eventsNot.map(({ _id, name, event_type, price }, i) => (
            <>
              <div
                className="card border-warning mb-3 d-inline-flex p-3 m-3"
                style={{ maxWidth: "18rem" }}
              >
                <div className="card-header">{name}</div>
                <div className="card-body">
                  <p className="card-text">{event_type}</p>
                  <h5 className="card-title">{price}</h5>
                  <button
                    onClick={() => addEvent(_id)}
                    className="btn btn-success"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};
