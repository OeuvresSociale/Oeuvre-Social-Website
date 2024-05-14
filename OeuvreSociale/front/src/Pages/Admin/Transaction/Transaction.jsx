import React from "react";
import { Typography } from "@mui/material";
import "../../../Styles/Admin/Admin_pages.css"
import Sidebar from "../../../Components/Sidebar.jsx";
import Transaction_Table from "../../../Components/tabeles/Transaction_Table.jsx";
import Transaction_form from "../../../Components/Admin/Transaction/Transaction_form.jsx"
//import TopMenu from "../../../Components/Admin/bar_menu/TopMenu.jsx";
import Header from '../../../Components/Header.jsx';



const Transaction = () => {
  return (
    <div>
      <div className="admin-container">
        <Sidebar />
        <div className="admin-content">
          {/* <TopMenu /> */}
          <Header/>
          <Typography
            variant="h3"
            component="h3"
            sx={{
              textAlign: "left",
              mt: 3,
              mb: 3,
              color: "#00194f",
              margin: "20px",
            }}
          >
            Table de Transaction
          </Typography>  
           <Transaction_form />
          
          <div className="componentContainer">
            <Transaction_Table />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
