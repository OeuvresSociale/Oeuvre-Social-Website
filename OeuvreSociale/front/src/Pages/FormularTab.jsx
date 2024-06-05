import React from "react";
import ListForms from "../Components/ListForms";
import EmployeeDemande_Table from "../Components/tabeles/EmployeeDemande_Table.jsx";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar.jsx";
import "../Styles/Admin/global/structureDuPage.css";
import Page_Header from "../Components/Admin/bar_menu/Page_Header.jsx";

const FormularTab = () => {
  return (
    <div className="body_space">
      <Sidebar />
      <div className="dataContainer">
        <Header />
        <Page_Header
          title="Liste Des Demandes"
          subtitle="Faire une demande mena hihihi"
        />
        <div className="ComposContainer">
          <div style={{ width: "25%", alignItems: "right" }}>
            <ListForms />
          </div>
          <div style={{ width: "75%" }}>
            <div className="componentContainer">
              <EmployeeDemande_Table />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularTab;
