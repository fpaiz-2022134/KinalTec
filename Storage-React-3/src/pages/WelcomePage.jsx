import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css'

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <h1>Bienvenido a tu almacenadora</h1>
      <Link to="/localStorage">
        <button className="btn">Crear una tarea</button>
      </Link>
      <Link to="/taskPage/tasks">
        <button className="btn">Ir a mi lista de tareas</button>
      </Link>
    </div>
  );
};

export default WelcomePage;