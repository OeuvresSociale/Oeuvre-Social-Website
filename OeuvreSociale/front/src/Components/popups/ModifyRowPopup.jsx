import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Typography, Grid } from "@mui/material";
import { InsertDriveFile } from "@mui/icons-material";
import axios from "axios";

const ModifyRowPopup = ({
  open,
  editableRowData,
  handleSaveEdit,
  handleCancelEdit,
  setEditableRowData,
  pdf, // PDF content stored in a variable
}) => {
  const [formData, setFormData] = useState({ ...editableRowData });

  useEffect(() => {
    setFormData({ ...editableRowData });
  }, [editableRowData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });

    if (name === "file") {
      const fileName = files[0].name;
      document.querySelector(".file-text").textContent = fileName;
    }
  };

  const handleSave = () => {
    // Send formData to backend
    axios
      .put("http://localhost:8000/api/RequestyAll", formData)
      .then((response) => {
        // Handle success if needed
        handleSaveEdit(formData);
      })
      .catch((error) => {
        // for handling erreur
        console.error("Error saving data:", error);
      });
  };

  return (
    <Modal
      open={open}
      onClose={handleCancelEdit}
    
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          width: "auto",
          border:"none",
          borderRadius:"10px",
        }}
      >
        <Typography
          variant="h4"
          component="h4"
          sx={{
            textAlign: "left",
            mt: 2,
            mb: 3,
            color: "#00194f",
            margin: "10px",
          }}
        >
          Modification de ligne:
        </Typography>
        <TextField
          label="Concerné"
          value={editableRowData?.name || ""}
          onChange={(e) =>
            setEditableRowData({
              ...editableRowData,
              name: e.target.value,
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
          value={editableRowData?.Amount || ""}
          onChange={(e) =>
            setEditableRowData({
              ...editableRowData,
              Amount: e.target.value,
            })
          }
        />
        <Select
          label="categorie"
          value={editableRowData?.categorie || ""}
          onChange={(e) =>
            setEditableRowData({
              ...editableRowData,
              categorie: e.target.value,
            })
          }
        >
          <MenuItem value="sortant">Sortant</MenuItem>
          <MenuItem value="entrant">Entrant</MenuItem>
        </Select>
        {pdf && (
          <Grid item xs={12}>
            {/* Display the existing PDF */}
            <iframe title="pdfViewer" src={pdf} width="100%" height="500px" />
          </Grid>
        )}
        <Grid item xs={12}>
          {/* Allow user to upload additional PDF */}
          <div className="pdf-field">
            <label className="file-label">
              <input
                type="file"
                accept=".pdf"
                name="file"
                onChange={(e) => {
                  setEditableRowData({
                    ...editableRowData,
                    files: e.target.files[0],
                  });
                }}
                className="file-input"
              />
              <span className="file-icon">
                <InsertDriveFile />
              </span>
              <span className="file-text">Importer un autre PDF</span>
            </label>
          </div>
        </Grid>
        <Grid item xs={12} className="popup_button">
          <Grid container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCancelEdit}
              >
                Annuler
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveEdit}
              >
                Enregistrer
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ModifyRowPopup;
