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
  //     concerned: "Manel",
  //     type: "Mariage",
  //     date: "2024-02-20",
  //     amount: 1000,
  //     direction: "sortant",
  //   },
  //   {
  //     id: 2,
  //     concerned: "Manl",
  //     type: "Mariage",
  //     date: "2024-02-20",
  //     amount: 1000,
  //     direction: "entrant",
  //   },
  //   {
  //     id: 3,
  //     concerned: "Manel",
  //     type: "Marge",
  //     date: "2024-02-20",
  //     amount: 1000,
  //     direction: "sortant",
  //   },
  // ]);
  const [open, setOpen] = useState(false);

  //Fetchin data
  // const [data, setData] = useState([]);
  // const getTrans_Data = async () => {
  //   await axios
  //     .get("http://localhost:8000/api/Transactions")
  //     .then((response) => {
  //       setData(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
 
   const [rows, setRows] = useState([]);

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
        date: transaction.date,
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
    { field: "concerned", headerName: "Concerné", width: 275 },
    { field: "type", headerName: "Type", width: 275 },
    { field: "date", headerName: "Date d'envoi", width: 275 },
    { field: "amount", headerName: "Somme", width: 275 },
    { field: "direction", headerName: "Direction", width: 200 },
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
