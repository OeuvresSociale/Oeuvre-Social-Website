import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, IconButton, MenuItem, Select, TextField, Modal, Box, Button } from "@mui/material";
import { Edit, PictureAsPdf } from "@mui/icons-material"; 
import "../../Styles/tables/DataGrid.css";

const Transactions_Table = () => {
  const [editableRowId, setEditableRowId] = useState(null);
  const [editableRowData, setEditableRowData] = useState(null);
  const [rows, setRows] = useState([
    {
      id: 1,
      concerned: "Manel",
      type: "Mariage",
      date: "2024-02-20",
      amount: 1000,
      direction: "sortant",
    },
    {
      id: 2,
      concerned: "Manl",
      type: "Mariage",
      date: "2024-02-20",
      amount: 1000,
      direction: "entrant",
    },
    {
      id: 3,
      concerned: "Manel",
      type: "Marge",
      date: "2024-02-20",
      amount: 1000,
      direction: "sortant",
    },
  ]);
  const [open, setOpen] = useState(false);

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
          onEditCellChangeCommitted={(params) => {
            // Handle data change after editing if needed
            console.log("Row edited:", params);
          }}
          sx={{
            textAlign: "center",
            color: "#00194f",
            border: "none",
            padding: "30px",
            fontSize: "15px",
          }}
        />
        <Modal
          open={open}
          onClose={handleCancelEdit}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: 400 }}>
            {/* Display a form for editing */}
            <TextField
              label="Concerné"
              value={editableRowData?.concerned || ""}
              onChange={(e) =>
                setEditableRowData({
                  ...editableRowData,
                  concerned: e.target.value,
                })
              }
            />
            <TextField
              label="Type"
              value={editableRowData?.type || ""}
              onChange={(e) =>
                setEditableRowData({
                  ...editableRowData,
                  type: e.target.value,
                })
              }
            />
            <TextField
              label="Date d'envoi"
              type="date"
              value={editableRowData?.date || ""}
              onChange={(e) =>
                setEditableRowData({
                  ...editableRowData,
                  date: e.target.value,
                })
              }
            />
            <TextField
              label="Somme"
              type="number"
              value={editableRowData?.amount || ""}
              onChange={(e) =>
                setEditableRowData({
                  ...editableRowData,
                  amount: e.target.value,
                })
              }
            />
            <Select
              label="Direction"
              value={editableRowData?.direction || ""}
              onChange={(e) =>
                setEditableRowData({
                  ...editableRowData,
                  direction: e.target.value,
                })
              }
            >
              <MenuItem value="sortant">Sortant</MenuItem>
              <MenuItem value="entrant">Entrant</MenuItem>
            </Select>
            {/* Add input fields for other editable fields */}
            <Button variant="contained" onClick={handleSaveEdit}>Save</Button>
            <Button variant="contained" onClick={handleCancelEdit}>Cancel</Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Transactions_Table;
