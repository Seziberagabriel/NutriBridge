import React, { useState, useEffect } from "react";
import apiClient from "../api/apiClient";

function Resources() {
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  const fetchResources = async () => {
    try {
      const res = await apiClient.get("/resources", { params: { search, type } });
      setResources(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [search, type]);

  return (
    <div className="container mt-4">
      <h2>Nutrition Knowledge Hub</h2>
      <div className="d-flex mb-3">
        <input
          type="text"
          placeholder="Search by title..."
          className="form-control me-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="form-select"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="article">Article</option>
          <option value="video">Video</option>
          <option value="infographic">Infographic</option>
        </select>
      </div>

      {resources.length === 0 ? (
        <p>No resources found.</p>
      ) : (
        <div className="row">
          {resources.map((r) => (
            <div key={r.id} className="col-md-4 mb-3">
              <div className="card p-3 shadow-sm">
                <h5>{r.title}</h5>
                <p>{r.description}</p>
                <a href={r.url} target="_blank" rel="noreferrer">
                  {r.content_type === "video" ? "Watch Video" : "View Resource"}
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Resources;

