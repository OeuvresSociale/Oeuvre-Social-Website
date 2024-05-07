import React from "react";
import Header from "../Components/Header";
import Usertable from "../Components/Usertable";
import "./Employeelist.css";
import Sidebar from "../Components/Sidebar";

const Employeelist = () => {
  return (
    <div className="containerf">
      <Sidebar />
      <div className="contentf">
        <Header className="header" />
        <Usertable className="usertable" />
      </div>
    </div>
  );
};

export default Employeelist;
