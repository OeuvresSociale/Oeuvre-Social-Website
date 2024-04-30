import React from "react";
//import'./Addemployee.css';

import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

const Dashboard = () => {
  return (
    <div>
      <div className="containerf">
        <Sidebar />
        <div className="contentf">
          <Header />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
