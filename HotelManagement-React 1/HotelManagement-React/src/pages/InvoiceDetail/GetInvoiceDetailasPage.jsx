import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const GetInvoiceDetailasPage = () => {
  const [as, setAs] = useState([{}]);
  const [asNot, setAsNot] = useState([{}]);
  const { _id } = useParams();

  //-------------------------Mostrar datos
  const getAs = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:2880/invoicedetail/getas/${_id}`
      );
      if (data.additionalServices) {
        setAs(data.additionalServices);
      }
    } catch (err) {
      console.log(err);
      throw new Error(
        err.response.message || "Error getting additional services"
      );
    }
  };

  const getAsNot = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:2880s/invoicedetail/getasnot/${_id}`
      );
      if (data.servicesNot) {
        setAsNot(data.servicesNot);
      }
    } catch (err) {
      console.log(err);
      throw new Error(
        err.response.message ||
          "Error getting additional services not on invoice detail"
      );
    }
  };

  //-------------------------Agregar o eliminar additional service

  const addAs = async (idService) => {
    try {
      let form = {
        additionalServices: idService,
      };
      const { data } = await axios.put(
        `http://localhost:2880/invoicedetail/addas/${_id}`,
        form
      );
      if (data.message) {
        getAs();
        getAsNot();
      }
    } catch (err) {
      console.log(err);
      throw new Error(
        err.response.message ||
          "Error saved additional services in the invoice detail"
      );
    }
  };

  const deleteAs = async (idService) => {
    try {
      let form = {
        additionalServices: idService,
      };
      const { data } = await axios.put(
        `http://localhost:2880/invoicedetail/deleteas/${_id}`,
        form
      );
      if (data.message) {
        getAs();
        getAsNot();
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
    getAs();
    getAsNot();
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="container">
          <Link to={"/home/invoicedetail"} className="btn btn-info">
            Regresar
          </Link>
          Addtitional Services
        </h1>
      </div>

      <div className="container">
        <h2 className="text-center">My additional services</h2>
        <div className="d-flex flex-wrap">
          {as.map(({ _id, name, description, price }, i) => (
            <>
              <div
                className="card border-warning mb-3 d-inline-flex p-3 m-3"
                style={{ maxWidth: "18rem" }}
              >
                <div className="card-header">{name}</div>
                <div className="card-body">
                  <p className="card-text">{description}</p>
                  <h5 className="card-title">{price}</h5>
                  <button
                    onClick={() => deleteAs(_id)}
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
        <h2> Services </h2>
        <div className="d-flex flex-wrap">
          {asNot.map(({ _id, name, description, price }, i) => (
            <>
              <div
                className="card border-warning mb-3 d-inline-flex p-3 m-3"
                style={{ maxWidth: "18rem" }}
              >
                <div className="card-header">{name}</div>
                <div className="card-body">
                  <p className="card-text">{description}</p>
                  <h5 className="card-title">{price}</h5>
                  <button
                    onClick={() => addAs(_id)}
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
