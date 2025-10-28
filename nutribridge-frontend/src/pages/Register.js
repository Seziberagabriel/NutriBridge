import React, { useState } from "react";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", password: "", role: "user",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post("/auth/register", formData);
      setMessage("Registration successful! Please login.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      {message && <p className="text-success">{message}</p>}
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3"><label>Name</label>
          <input type="text" name="name" className="form-control"
                 value={formData.name} onChange={handleChange} required />
        </div>
        <div className="mb-3"><label>Email</label>
          <input type="email" name="email" className="form-control"
                 value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3"><label>Phone</label>
          <input type="text" name="phone" className="form-control"
                 value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="mb-3"><label>Password</label>
          <input type="password" name="password" className="form-control"
                 value={formData.password} onChange={handleChange} required />
        </div>
        <div className="mb-3"><label>Role</label>
          <select name="role" className="form-select"
                  value={formData.role} onChange={handleChange}>
            <option value="user">Household</option>
            <option value="ngo">NGO</option>
          </select>
        </div>
        <button className="btn btn-success">Register</button>
      </form>
    </div>
  );
}

export default Register;

