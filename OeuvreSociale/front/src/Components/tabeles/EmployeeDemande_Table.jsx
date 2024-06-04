import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import InfoIcon from "@mui/icons-material/Info";
import { IconButton } from "@mui/material";
import "../../Styles/tables/DataGrid.css";

function LoanRecever_Table() {
  const [rows, setRows] = useState([
    {
      id: 1,
      name: "Widad",
      type: "Mariage",
      date: "2024-02-20",
      Status: "En attente",
    },
    {
      id: 2,
      name: "Fatima",
      type: "Naissance",
      date: "2024-02-20",
      Status: "Refuser",
    },
  ]);

  useEffect(() => {
    getEmployeeDemande_data();
  }, []);

  const getEmployeeDemande_data = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/Requests");
      const data = response.data;
      console.log("The data passed are here:", data);
      // Map fetched data to match the structure of rows
      const rowData = data.map((Demande) => ({
        id: Demande._id,
        type: Demande.requestTypeId.title,
        date: new Date(Demande.creationDate).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        Status: Demande.state,
      }));
      // Update the state with the mapped data
      setRows(rowData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Declare the columns content
  const columns = [
    { field: "id", headerName: "N°", width: 200 },
    { field: "type", headerName: "Type", width: 275 },
    { field: "date", headerName: "Date d'envoi", width: 275 },
    {
      field: "Status", // Ensure this matches the property name in your data
      headerName: "Status",
      width: 275,
      renderCell: (params) => (
        <span className="status-unknown">{params.value}</span>
      ),
    },
  ];

  return (
    <div div className="dataGridContainer">
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
  );
}

export default LoanRecever_Table;
