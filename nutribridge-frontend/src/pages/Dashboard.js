import React from "react";

function Dashboard({ theme }) {
  const cardClasses = theme === "light"
    ? "card text-dark bg-light mb-3"
    : "card text-light bg-secondary mb-3";

  return (
    <div className="container">
      <h2 className="mb-4">Dashboard</h2>
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className={cardClasses}>
            <div className="card-body">
              <h5 className="card-title">Users</h5>
              <p className="card-text">150</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className={cardClasses}>
            <div className="card-body">
              <h5 className="card-title">Requests</h5>
              <p className="card-text">35</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className={cardClasses}>
            <div className="card-body">
              <h5 className="card-title">NGOs</h5>
              <p className="card-text">12</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

