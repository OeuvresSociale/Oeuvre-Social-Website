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
import "../../Styles/Formulaire.css";

const ModifyRowPopup = ({
  open,
  editableRowData,
  handleSaveEdit,
  handleCancelEdit,
  setEditableRowData,
  pdf, // PDF content stored in a variable
}) => {
  const [formData, setFormData] = useState({ ...editableRowData });
console.log('data:',editableRowData)
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
      .put(`http://localhost:8000/api/updateTransaction/${1}`, formData)
      .then((response) => {
        // Handle success if needed
        handleSaveEdit(formData);
      })
      .catch((error) => {
        // for handling erreur
        console.error("Error saving data:", error);
      });
  };
  // justify-self: center;
  // display: flex;
  // flex-direction: column;
  
  // justify-content: center;
  // align-items: center;
  // height: auto;
  return (
    <Modal open={open} onClose={handleCancelEdit}>
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
          border: "none",
          borderRadius: "10px",
          gap: "25px",
          display:"flex",
          flexDirection:"column",
          justifyContent:"center",


        }}
      >
        
          <div className="f1">
            <div style={{ width: "100%" }}>
              <div>
                <Typography
                  variant="h4"
                  component="h4"
                  sx={{
                    textAlign: "left",
                    color: "#00194f",
                  }}
                >
                  Modifier la transaction:
                </Typography>
              </div>
            </div>
          </div>
          <div className="f1">
            <div style={{ width: "33%" }}>
              <TextField
              fullWidth
                label="Concerné"
                value={editableRowData?.name || ""}
                onChange={(e) =>
                  setEditableRowData({
                    ...editableRowData,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div style={{ width: "33%" }}>
              <Select
              fullWidth
                label="Type"
                value={editableRowData?.type || ""}
                onChange={(e) =>
                  setEditableRowData({
                    ...editableRowData,
                    type: e.target.value,
                  })
                }
              >
                <MenuItem value="demande">Demande</MenuItem>
                <MenuItem value="loan">Prêt</MenuItem>
                <MenuItem value="annonce">Offre</MenuItem>
                <MenuItem value="repayment">Repayment</MenuItem>
                <MenuItem value="autre">Autre</MenuItem>
              </Select>
            </div>
            <div style={{ width: "33%" }}>
              <TextField
              fullWidth
                label="Date d'envoi"
                type="date"
                value={editableRowData?.creationDate || ""}
                onChange={(e) =>
                  setEditableRowData({
                    ...editableRowData,
                    creationDate: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="f1">
            <div style={{ width: "50%" }}>
              <TextField
              fullWidth
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
            </div>
            <div style={{ width: "50%" }}>
              <Select
              fullWidth
                label="categorie"
                value={editableRowData?.categorie || ""}
                onChange={(e) =>
                  setEditableRowData({
                    ...editableRowData,
                    categorie: e.target.value,
                  })
                }
              >
                <MenuItem value="outcome">Sortant</MenuItem>
                <MenuItem value="income">Entrant</MenuItem>
              </Select>
            </div>
          </div>
          <div className="f1">
            <div style={{ width: "100%" }}>
              {pdf && (
                <Grid item xs={12}>
                  {/* Display the existing PDF */}
                  <iframe
                    title="pdfViewer"
                    src={pdf}
                    width="100%"
                    height="500px"
                  />
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
            </div>
          </div>
          <div className="f1">
            <div style={{ width: "100%" }}>
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
            </div>
          </div>
        
      </Box>
    </Modal>
  );
};

export default ModifyRowPopup;