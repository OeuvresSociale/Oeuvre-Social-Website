import React from "react";
import { Typography } from "@mui/material";
import "../../../Styles//Admin/global/structureDuPage.css";
import Header from "../../../Components/Header";
import Sidebar from "../../../Components/Sidebar";
import DemandValid_Table from "../../../Components/tabeles/DemandValid_Table.jsx";
import LoanValid_Table from "../../../Components/tabeles/LoanValid_Tables.jsx";
import Page_Header from "../../../Components/Admin/bar_menu/Page_Header.jsx";
import Menu from "../../../Components/Menu.jsx"

const DemandValid = () => {
  return (
    <div>
      <div className="body_space">
        <Sidebar />
        <div className="dataContainer">
          <Header />
          <Page_Header title = "Demande Valide" subtitle="Table des demandes valider par les jurés"/>
          
          <Menu components={{ demands: DemandValid_Table , loan: LoanValid_Table }} />
         
        </div>
      </div>
    </div>
  );
};

export default DemandValid;