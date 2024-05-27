import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css';

import welcome from '../assets/welcome.jpg';

const WelcomePage = () => {
  return (
    <div className='center'>
      <h1>Bienvenido a tu almacenadora</h1>
      <div className="wrapper">
        <div className="welcome-container">
        <div className="image-container">
          <img src={welcome} alt="Bienvenida" />
        </div>
          <Link to="/localStorage">
            <button className="btn">Crear una tarea</button>
          </Link>
          <Link to="/taskPage/tasks">
            <button className="btn">Ir a mi lista de tareas</button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default WelcomePage;
