import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, IconButton } from "@mui/material";
import { Edit, PictureAsPdf} from "@mui/icons-material"; 
import "../../Styles/tables/DataGrid.css";

const Transactions_Table = () => {
  
  const columns = [
    { field: "concerned", headerName: "Concerné", width: 275 },
    { field: "type", headerName: "Type", width: 275 },
    { field: "date", headerName: "Date d'envoi", width: 275 },
    { field: "amount", headerName: "Somme", width: 275 },
    {
      field: "pdf",
      headerName: "PDF",
      width: 140,
      renderCell: () => (
        <Avatar>
          <PictureAsPdf />
        </Avatar>
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 140,
      renderCell: () => (
        <IconButton>
          <Edit />
        </IconButton>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      concerned: "Manel",
      type: "Mariage",
      date: "2024-02-20",
      amount: 1000,
    },
    {
      id: 2,
      concerned: "Manl",
      type: "Mariage",
      date: "2024-02-20",
      amount: 1000,
    },
    {
      id: 3,
      concerned: "Manel",
      type: "Marge",
      date: "2024-02-20",
      amount: 1000,
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
};

export default Transactions_Table;
