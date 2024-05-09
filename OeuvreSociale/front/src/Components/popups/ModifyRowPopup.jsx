import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const ModifyRowPopup = ({ open, editableRowData, handleSaveEdit, handleCancelEdit, setEditableRowData }) => {
  return (
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
  );
};

export default ModifyRowPopup;
