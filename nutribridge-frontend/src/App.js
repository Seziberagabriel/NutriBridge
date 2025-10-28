import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ padding: "20px" }}>
          <h1>NutriBridge Frontend Debug Mode</h1>
          <nav style={{ marginBottom: "20px" }}>
            <Link to="/" style={{ marginRight: "10px" }}>Login</Link>
            <Link to="/register" style={{ marginRight: "10px" }}>Register</Link>
            <Link to="/dashboard">Dashboard</Link>
          </nav>
        </div>
        <Routes>
          <Route
            path="/login"
            element={
              <div>
                <h2>Login Page</h2>
                <Login />
              </div>
            }
          />
          <Route
            path="/register"
            element={
              <div>
                <h2>Register Page</h2>
                <Register />
              </div>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div>
                  <h2>Dashboard</h2>
                  <Dashboard />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <div>
                <h2>Default Route: Login Page</h2>
                <Login />
              </div>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

