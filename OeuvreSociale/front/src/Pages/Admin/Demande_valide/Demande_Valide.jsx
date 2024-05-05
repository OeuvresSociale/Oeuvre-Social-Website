import React from "react";
import { Typography } from "@mui/material";
import "../../../Styles//Admin/global/structureDuPage.css";
import Header from "../../../Components/Header";
import Sidebar from "../../../Components/Sidebar";
import DemandValid_Table from "../../../Components/tabeles/DemandValid_Table.jsx";


const DemandValid = () => {
  return (
    <div>
      <div className="body_space">
        <Sidebar />
        <div className="dataContainer">
          <Header />
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
            Table de DemandValid
          </Typography>
          <div className="componentContainer">
            <DemandValid_Table />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemandValid;
