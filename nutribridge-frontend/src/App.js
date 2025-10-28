import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <h1>NutriBridge Frontend Debug</h1>
        <nav>
          <Link to="/" style={{ marginRight: "10px" }}>Login</Link>
          <Link to="/register" style={{ marginRight: "10px" }}>Register</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>

        <Routes>
          <Route path="/" element={<h2>Login Page (Debug)</h2>} />
          <Route path="/register" element={<h2>Register Page (Debug)</h2>} />
          <Route path="/dashboard" element={<h2>Dashboard Page (Debug)</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

