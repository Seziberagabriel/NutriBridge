import React from "react";
import { Link } from "react-router-dom";

function Navbar({ theme, toggleTheme }) {
  return (
    <nav className={`navbar navbar-expand-lg ${theme === "light" ? "navbar-light bg-primary" : "navbar-dark bg-dark"} mb-4`}>
      <div className="container">
        <Link className="navbar-brand" to="/">NutriBridge</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item ms-3">
              <button className="btn btn-outline-light btn-sm" onClick={toggleTheme}>
                {theme === "light" ? "Dark Mode" : "Light Mode"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

