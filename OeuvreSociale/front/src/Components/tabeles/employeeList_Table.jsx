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
      const response = await axios.get('http://localhost:8000/api/employees');
      const data = response.data;
      console.log("The data passed are here:", data);
      // Map fetched data to match the structure of rows
      const rowData = data.map((RecievedDemand) => ({
        id: RecievedDemand.idEmployee,
        name: `${RecievedDemand.familyName} ${RecievedDemand.firstName}`
        email: RecievedDemand.email,
        salaire: RecievedDemand.monthlySalary,
        role: RecievedDemand.role,
      }));
      // Update the state with the mapped data
      setRows(rowData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  

  // Declare the columns content

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Employee ", width: 275 },
    { field: "email", headerName: "Email", width: 275 },
    { field: "salaire", headerName: "Salaire", width: 275 },
    { field: "role", headerName: "Role", width: 275 }, 
    {
      field: "Details",
      headerName: "Details",
      width: 140,
      renderCell: (params) => (
        <IconButton onClick={() => handleDetails(params.row.id)}>
          <Edit />
        </IconButton>
      ),
    },
    {
        field: "edit",
        headerName: "Edit",
        width: 140,
        renderCell: (params) => (
          <IconButton onClick={() => handleEdit(params.row.id)}>
            <Edit />
          </IconButton>
        ),
      },
      {
        field: "delete",
        headerName: "Delete",
        width: 140,
        renderCell: (params) => (
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <Edit />
          </IconButton>
        ),
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
