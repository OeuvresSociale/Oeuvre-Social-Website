import React from "react";
//import'./Addemployee.css';

import Header from "../../../Components/Header";
import Sidebar from "../../../Components/Sidebar.jsx";
import DashBoard from "../../../Components/DashBoard.jsx";


const Dashboard = () => {
  return (
    <div>
      <div className="containerdem">
        <Sidebar />
        <div className="contentdem">
          <Header />
          
          <DashBoard/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
