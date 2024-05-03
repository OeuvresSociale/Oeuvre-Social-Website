import React from "react";
//import'./Addemployee.css';

import Header from "../../../Components/Header";
import Sidebar from "../../../Components/Sidebar";
import DataGrid from "../../../Components/tabeles/DataGrid.jsx";

const Transaction = () => {
  return (
    <div>
      <div className="containerf">
        <Sidebar />
        <div className="contentf">
          <Header />
          
      <h1>ataGrid</h1>
          <DataGrid/>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
