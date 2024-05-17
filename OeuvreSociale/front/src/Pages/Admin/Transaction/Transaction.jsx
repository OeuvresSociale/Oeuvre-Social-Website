import React from "react";
import { Typography } from "@mui/material";
import "../../../Styles/Admin/global/structureDuPage.css";
import Sidebar from "../../../Components/Sidebar.jsx";
import Transaction_Table from "../../../Components/tabeles/Transaction_Table.jsx";
import Transaction_form from "../../../Components/Admin/Transaction/Transaction_form.jsx"
//import TopMenu from "../../../Components/Admin/bar_menu/TopMenu.jsx";
import Header from '../../../Components/Header.jsx';
import Page_Header from "../../../Components/Admin/bar_menu/Page_Header.jsx";



const Transaction = () => {
  return (
    <div>
      <div className="body_space">
        <Sidebar />
        <div className="dataContainer">
          {/* <TopMenu /> */}
          <Header/>
          <Page_Header title="Table de Transaction" subtitle="WIWIWI"/>
          <Transaction_form/>
          <div className="componentContainer">
           
            <Transaction_Table />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
