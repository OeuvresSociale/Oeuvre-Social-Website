import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import "../../Styles/tables/DataGrid.css";

function DemandRecever_Table() {
  const [rows, setRows] = useState([
    {
      id: 1,
      name: "Manel",
      type: "Mariage",
      date: "2024-02-20",
      Status: "En attente",
    },
    {  
      id: 2,
      name: "Yoousra",
      type: "Naissance",
      date: "2024-02-20",
      Status: "Refuser",
    },
  ]);

  useEffect(() => {
    getDemandeReceived_data();
  }, []);

  const getDemandeReceived_data = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/Requests");
      const data = response.data;
      console.log("The data passed are here:", data);
      // Map fetched data to match the structure of rows
      const rowData = data.map((RecievedDemand) => ({
        id: RecievedDemand._id,
        name: RecievedDemand.name,
        type: RecievedDemand.type,
        date: RecievedDemand.date,
        Status: RecievedDemand.Status,
      }));
      // Update the state with the mapped data
      setRows(rowData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //Clorize the status
  const getStatusColor = (status) => {
    switch (status) {
      case "En attente":
        return "status-pending";
      case "Refuser":
        return "status-rejected";
      case "Accepter":
        return "status-accepted";
      default:
        return "status-pending";
    }
  };
  

  // Declare the columns content

  const columns = [
    { field: "id", headerName: "N°", width: 200 },
    { field: "name", headerName: "Employee ", width: 275 },
    { field: "type", headerName: "Type", width: 275 },
    { field: "date", headerName: "Date d'envoi", width: 275 },
    {
      field: "Status",
      headerName: "Status",
      width: 275,
      renderCell: (params) => (
        <span className={getStatusColor(params.value)}>{params.value}</span>
      ),
    },
    {
      field: "Details",
      headerName: "Details",
      width: 140,
    },
  ];

 

  return (
    <div style={{ width: "100%" }}>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          sx={{
            textAlign: "center",
            color: "#00194f",
            border: "none",
            padding: "30px",
            fontSize: "15px",
          }}
        />
      </div>
    </div>
  );
}

export default DemandRecever_Table;
