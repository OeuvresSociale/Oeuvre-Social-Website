import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import InfoIcon from '@mui/icons-material/Info';
import { IconButton } from '@mui/material'; 
import { useNavigate } from 'react-router-dom';
import "../../Styles/tables/DataGrid.css";

function DemandRecever_Table() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

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
        name:  `${RecievedDemand.employeeId.familyName} ${RecievedDemand.employeeId.firstName}`,
        type: RecievedDemand.requestTypeId ? RecievedDemand.requestTypeId.title : "Unknown",
        date: new Date(RecievedDemand.creationDate).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        Status: RecievedDemand.state,
      }));
      // Update the state with the mapped data
      setRows(rowData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to get the status color class based on status value
  const getStatusColor = (status) => {
    switch (status) {
      case "En attente":
        return "status-pending";
      case "Refuser":
        return "status-rejected";
      case "Accepter":
        return "status-accepted";
      default:
        return "status-unknown"; // Changed to indicate unknown status
    }
  };

  // Open Demande Recieved Details
  const handleDetailsClick = (params) => {
    const id = params.row.id;
    navigate(`/tables/demandetype/${id}`); // Use navigate to redirect to the details page
  };

  // Declare the columns content
  const columns = [
    { field: "id", headerName: "N°", width: 200 },
    { field: "name", headerName: "Employee", width: 275 },
    { field: "type", headerName: "Type", width: 275 },
    { field: "date", headerName: "Date d'envoi", width: 275 }, // Change this line
    {
      field: "Status", // Ensure this matches the property name in your data
      headerName: "Status",
      width: 275,
      renderCell: (params) => (
        <span className={getStatusColor(params.value)}>{params.value}</span>
      ),
    },
    {
      field: "details",
      headerName: "Details",
      width: 140,
      renderCell: (params) => (
        <IconButton onClick={() => handleDetailsClick(params)}>
          <InfoIcon/>
        </IconButton>
      ),
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <div style={{ height: "auto", width: "100%" }}>
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          pagination
          rowsPerPageOptions={[10]} // Set options for rows per page
          sx={{
            height: 400,
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