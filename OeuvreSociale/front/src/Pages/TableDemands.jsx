import React from "react";
import Menu from "../Components/Menu";
import DemandRecever_Table from "../Components/tabeles/DemandRecever_Table.jsx";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import Page_Header from "../Components/Admin/bar_menu/Page_Header.jsx";
import "../Styles/Admin/Admin_pages.css";

const TableDemands = () => {
  return (
    <div>
      <div className="admin-container">
        <Sidebar />
        <div className="admin-content">
          {/* <TopMenu /> */}
          <Header />
         <Page_Header title="Les Demande Recever" subtitle="les tables des demande et loan recever"/>

          <div className="componentContainer">
            <DemandRecever_Table />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableDemands;
