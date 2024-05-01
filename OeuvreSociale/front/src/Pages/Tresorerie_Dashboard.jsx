import React from "react";
//import'./Addemployee.css';

import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

const Tdashboard = () => {
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

export default Tdashboard;
