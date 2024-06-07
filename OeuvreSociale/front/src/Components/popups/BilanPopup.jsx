import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import {DatePicker } from '@mui/lab';
import { Grid, Alert, AlertTitle } from "@mui/material";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import "../../Styles/Formulaire.css";

const BilanPopup = ({ open, handleClose, handleDownload }) => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const inputs = { fromDate, toDate };
  

  
  useEffect(() => {
    if (fromDate && toDate) {
      const sendData = async () => {
        // try {
        //   await axios.post("http://localhost:8000/api/register", inputs);
         
        // } catch (error) {
        //     console.error("Error");
         
        // }
        try{
            const response = await axios.post("http://localhost:8000/api/generate-bilan", {
              bilanData: [], // Mettez vos données ici
              startDate: fromDate, // Remplacez par votre date de début
              endDate: toDate, // Remplacez par votre date de fin
              fileName: "votre_nom_de_fichier", // Remplacez par le nom du fichier
            }, {
              responseType: "blob",
            });
            console.log('bilan:');
            // Téléchargez le fichier PDF généré
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `bilan de ${fromDate} a ${toDate}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
          } catch (error) {
            console.error("Error generating PDF:", error);
            // Gérer les erreurs
          }
      };

      sendData();
    }
  }, [fromDate, toDate, inputs]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'fromDate') {
      setFromDate(value);
    } else if (name === 'toDate') {
      setToDate(value);
    }
  };
  const handleClosebtn =()=>
    {
        handleClose();
      setFromDate(null);
      setToDate(null);
    }


const handleDownloadbtn =()=>
    {
        handleDownload(fromDate, toDate);
      setFromDate(null);
      setToDate(null);
      handleClose();
    }
  return (
   
    <Dialog open={open} onClose={handleClose}
    PaperProps={{
        sx: {
          width: "900px",
          maxHeight: "80vh",
          borderColor: "#148582",
          padding: "10px",
          fontFamily: "Montserrat",
        },
      }}>
      <DialogTitle
       style={{
        backgroundColor: "#fff",
        color: "#00194f",
        textAlign: "center",
        fontSize: "1.5rem",
      }}>
        <h3>Télécharger le bilan</h3></DialogTitle>
      <DialogContent>
      <div className="f1">
    <div style={{ width: "50%" }}>
      <TextField
            label="Date"
            name="fromDate"
            type="date"
            value={fromDate}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          </div>
          <div style={{ width: "50%" }}>
          <TextField
            label="Date"
            name="toDate"
            type="date"
            value={toDate}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          </div></div>
         
      </DialogContent>
      <DialogActions>
       
        <div className="f1">
            <div style={{ width: "100%" }}>
              <Grid item xs={12} className="popup_button">
                <Grid container justifyContent="flex-end" spacing={2}>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleClosebtn}
                    >
                      Annuler
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleDownloadbtn}
                      disabled={!fromDate || !toDate}
                    >
                      Télécharger
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </div>
            </div>
      </DialogActions>
    </Dialog>
  );
};

export default BilanPopup;