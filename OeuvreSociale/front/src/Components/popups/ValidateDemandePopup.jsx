import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import { InsertDriveFile } from "@mui/icons-material";
import axios from "axios";

const ValidateDemandePopup = ({ openPopup, handleClosePopup, selectedRow }) => {
  const [pdfFile, setPdfFile] = useState(null);

  const handlePdfChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPdfFile(file);
      const fileName = file.name;
      const fileTextElement = document.querySelector(".file-text");
      if (fileTextElement) {
        fileTextElement.textContent = fileName;
      }
    }
  };

  const handleSubmit = async () => {
    if (selectedRow && pdfFile) {
      const formData = new FormData();
      formData.append("files", pdfFile); // Append the file to formData
      
      try {
        const response = await axios.put(
          `http://localhost:8000/api/Requestvalide/${selectedRow.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          alert("Request updated and moved successfully");
          handleClosePopup();
        }
      } catch (error) {
        alert("Error validating request:", error.message);
        handleClosePopup();
      }
    }
  };

  return (
    <Dialog
      open={openPopup}
      onClose={handleClosePopup}
      PaperProps={{
        sx: {
          width: "900px",
          maxHeight: "80vh",
          borderColor: "#148582",
          padding: "10px",
          fontFamily: "Montserrat",
        },
      }}
    >
      <DialogTitle
        style={{
          backgroundColor: "#fff",
          color: "#00194f",
          textAlign: "center",
          fontSize: "1.5rem",
        }}
      >
        <h3>Validation Du Demande</h3>
      </DialogTitle>

      <DialogContent>
        {selectedRow && (
          <div style={{ color: "#313131", margin: "20px" }}>
            <Typography variant="h5">
              <strong>Mr/Mme:</strong> {selectedRow.concerned}
            </Typography>
            <Typography variant="h5">
              <strong>Type de demande:</strong> {selectedRow.type}
            </Typography>
            <Typography variant="h5">
              <strong>Date d'acceptation:</strong> {selectedRow.date}
            </Typography>
            <Typography variant="h5">
              <strong>Amount:</strong> {selectedRow.amount}
            </Typography>
            <div className="pdf-field">
              <label className="file-label">
                <input
                  type="file" 
                  accept=".pdf"
                  name="file"
                  onChange={handlePdfChange}
                  required
                  className="file-input"
                />
                <span className="file-icon">
                  <InsertDriveFile />
                </span>
                <span className="file-text">
                  Importer Le récépissé de dépot
                </span>
              </label>
            </div>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Grid item xs={12} className="popup_button">
          <Grid container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClosePopup}
              >
                Annuler
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={!pdfFile}
              >
                Valider
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default ValidateDemandePopup;
