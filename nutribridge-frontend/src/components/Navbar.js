import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light px-3">
      <Link to="/" className="navbar-brand">NutriBridge</Link>
      <div>
        <Link to="/login" className="btn btn-outline-primary me-2">Login</Link>
        <Link to="/register" className="btn btn-outline-success">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;

