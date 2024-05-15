import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, IconButton } from "@mui/material";
import { Edit, PictureAsPdf } from "@mui/icons-material"; 
import ModifyRowPopup from "../popups/ModifyRowPopup";
import axios from "axios";
import "../../Styles/tables/DataGrid.css";

const Transactions_Table = () => {
  const [editableRowId, setEditableRowId] = useState(null);
  const [editableRowData, setEditableRowData] = useState(null);
  // const [rows, setRows] = useState([
  //   {
  //     id: 1,
  //     name: "Manel",
  //     type: "Mariage",
  //     date: "2024-02-20",
  //     amount: 1000,
  //     categorie: "sortant",
  //   },
  //   {
  //     id: 2,
  //     name: "Manl",
  //     type: "Mariage",
  //     date: "2024-02-20",
  //     amount: 1000,
  //     categorie: "entrant",
  //   },
  //   {
  //     id: 3,
  //     name: "Manel",
  //     type: "Marge",
  //     date: "2024-02-20",
  //     amount: 1000,
  //     categorie: "sortant",
  //   },
  // ]);
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([{
        id: 1,
        name: "Manel",
        type: "Mariage",
        creationDate: "2024-02-20",
        Amount: 1000,
        categorie: "sortant",
      },]);

  useEffect(() => {
    getTrans_Data();
  }, []);

  const getTrans_Data = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/RequestyAll");
      const data = response.data;
      //Debugging the fetched Data
      console.log("The data passed are here:", data);
      // Map fetched data to match the structure of rows
      const rowData = data.map((transaction) => ({
        id: transaction._id,
        name: transaction.name,
        type: transaction.type,
        // creationDate: transaction.creationDate,
        creationDate: new Date(transaction.creationDate).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
      }),
        Amount: transaction.Amount,
        categorie: transaction.categorie,
        files: transaction.files,
      }));
      // Update the state with the mapped data
      setRows(rowData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
   
  
  //Handle Functions

  const handleEdit = (rowId) => {
    setEditableRowId(rowId);
    // Find the editable row data
    const editableRow = rows.find(row => row.id === rowId);
    if (editableRow) {
      // Store the editable row data
      setEditableRowData(editableRow);
      setOpen(true);
    }
  };

  const handleCancelEdit = () => {
    setEditableRowId(null);
    setEditableRowData(null);
    setOpen(false);
  };

  const handleSaveEdit = () => {
    // Update the corresponding row data in the rows array
    const updatedRows = rows.map(row => {
      if (row.id === editableRowId) {
        return editableRowData; // Assuming editableRowData has the updated data
      }
      return row;
    });
    // Update the rows array
    setRows(updatedRows);
    // Reset editableRowId and editableRowData
    setEditableRowId(null);
    setEditableRowData(null);
    setOpen(false);
  };

  //Declare the colums content

  const columns = [
    { field: "name", headerName: "Concerné", width: 275 },
    { field: "type", headerName: "Type", width: 275 },
    { field: "creationDate", headerName: "Date d'envoi", width: 275 },
    { field: "Amount", headerName: "Somme", width: 275 },
    { field: "categorie", headerName: "categorie", width: 200 },
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
      renderCell: (params) => (
        <IconButton onClick={() => handleEdit(params.row.id)}>
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
          editRowsModel={{
            id: editableRowId,
          }} 
        
          sx={{
            textAlign: "center",
            color: "#00194f",
            border: "none",
            padding: "30px",
            fontSize: "15px",
          }}
        />
         </div>
         {open && (
        <ModifyRowPopup
          open={open}
          editableRowData={editableRowData}
          handleSaveEdit={handleSaveEdit}
          handleCancelEdit={handleCancelEdit}
          setEditableRowData={setEditableRowData}
        />
      )}
     
    </div>
  );
};

export default Transactions_Table;
