import React, { useState, useContext } from "react";
import apiClient from "../api/apiClient";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function AddResource() {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content_type: "article",
    url: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  if (!user || (user.role !== "ngo" && user.role !== "admin")) {
    return <p className="text-danger m-3">Access denied. NGOs/Admins only.</p>;
  }

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post("/resources", formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setMessage("Resource added successfully!");
      setTimeout(() => navigate("/resources"), 1000);
    } catch (err) {
      setMessage("Error adding resource");
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Nutrition Resource</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea
            name="description"
            className="form-control"
            rows="3"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label>Content Type</label>
          <select
            name="content_type"
            className="form-select"
            value={formData.content_type}
            onChange={handleChange}
          >
            <option value="article">Article</option>
            <option value="video">Video</option>
            <option value="infographic">Infographic</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Resource URL</label>
          <input
            type="url"
            name="url"
            className="form-control"
            value={formData.url}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-success">Add Resource</button>
      </form>
    </div>
  );
}

export default AddResource;

