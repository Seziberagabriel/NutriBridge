import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h2>Welcome to NutriBridge Dashboard</h2>
      <p>Role: {user?.role}</p>
      <button className="btn btn-danger" onClick={() => { logout(); navigate("/login"); }}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;

