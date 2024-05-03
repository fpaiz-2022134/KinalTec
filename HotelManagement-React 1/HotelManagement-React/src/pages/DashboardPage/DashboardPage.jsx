import React, { useState, useContext } from "react";
import "../DashboardPage/DashBoardStyle.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Index";
import { Outlet, Link } from "react-router-dom";

export const DashboardPage = () => {
  const { isAdmin, setLoggedIn, role } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState(null);

  const [showScene, setShowScene] = useState({
    cellar: false,
    lease: false,
    user: false,
    account: false,
    service: false,
    reservation: false,
    reservations: false,
    graficas: false
  });

  const nav = () => {
    let x = localStorage.getItem('role')
    console.log(x)
    return (
      <>
        {x === "ADMINAM" ? (
          <>
            <li className="nav-item">
              <Link to={"users"} className="nav-link">
                User<i className="bi bi-star-fill"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"rooms"} className="nav-link">
                Room<i className="bi bi-star-fill"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"reservations"} className="nav-link">
                Reservations<i className="bi bi-star-fill"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"services"} className="nav-link">
                Service<i className="bi bi-star-fill"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"events"} className="nav-link">
                Events<i className="bi bi-star-fill"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"graficas"} className="nav-link">
                Graficas<i className="bi bi-star-fill"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link">
                ADMINAM<i className="bi bi-star-fill"></i>
              </Link>
            </li>
            <li onClick={() => logOut()} className="nav-item">
              <Link className="nav-link">
                Cerrar Sesion<i className="bi bi-star-fill"></i>
              </Link>
            </li>
          </>
        ) : x === "ADMIN" ? (
          <>
            <li className="nav-item">
              <Link to={"invoicedetail"} className="nav-link">
                Invoices Details<i className="bi bi-star-fill"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"bill"} className="nav-link">
                Bills<i className="bi bi-star-fill"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link">
                ADMIN<i className="bi bi-star-fill"></i>
              </Link>
            </li>
            <li onClick={() => logOut()} className="nav-item">
              <Link className="nav-link">
                Cerrar Sesion<i className="bi bi-star-fill"></i>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link to={"reservation"} className="nav-link">
                Reservaciones
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link">
                Cliente
              </Link>
            </li>
            <li onClick={() => logOut()} className="nav-item">
              <Link className="nav-link">
                Cerrar Sesion
              </Link>
            </li>
          </>
        )}
      </>
    )
  }

  const logOut = () => {
    localStorage.clear();
    setLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossorigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css"
      />
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand active">
              <Link to={""}>
                <span className="text-info"> Dashboard</span>
              </Link>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#menu"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="menu">
              <ul className="navbar-nav me-auto">
                {nav()}
              </ul>
              <hr className="d-md-none text-white-50" />
              <ul className="navbar-nav  flex-row flex-wrap text-light">
               
                <li className="nav-item col-6 col-md-auto p-3">
                  <i className="bi bi-whatsapp"></i>
                  <small className="d-md-none ms-2">WhatsApp</small>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="content">{activeView === "user" && <UsersPage />}</div>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
          crossorigin="anonymous"
        ></script>
      </div>
      <Outlet></Outlet>
    </>
  );
};
