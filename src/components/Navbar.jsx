import React from 'react';
import '../App.css';

const Navbar = ({ onLogout }) => {
  return (
    <nav className="navbar-modern">
      <div className="navbar-content">
        <div className="logo-container">
          <h1 className="navbar-title">Music Stream</h1>
        </div>
        <button onClick={onLogout} className="btn-logout">
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
};

export default Navbar;