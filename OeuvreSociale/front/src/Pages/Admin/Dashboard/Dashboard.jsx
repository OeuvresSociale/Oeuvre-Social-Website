import React from "react";
import Header from "../../../Components/Header";
import Sidebar from "../../../Components/Sidebar";

const Dashboard = () => {
  return (
    <div>
      <div className="containerf">
        <Sidebar />
        <div className="contentf">
          <Header />
          <div className="row">
            <div className="col-12">
              <h1>Dashboard</h1>
              <p className="fs-5 fw-light">
                Welcome to your Dashboard,{" "}
                <span className="fw-bold">Admin</span>!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
