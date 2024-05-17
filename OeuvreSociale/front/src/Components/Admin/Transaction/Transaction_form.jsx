import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, Typography } from "@mui/material";
import "./Transaction_form.css";
import axios from "axios"; // Import Axios library
import { InsertDriveFile } from "@mui/icons-material";

const Transaction_form = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    date: "",
    amount: "",
    categorie: "",
    file: null,
  });

  useEffect(() => {
      const submitForm = async () => {
        if (formData.name && formData.type && formData.date && formData.amount && formData.categorie && formData.files) {
          try {
            const response = await axios.post("http://localhost:8000/api/RequestyAll", formData);
            console.log("Form li submitinaha:", response.data);
            // Supprimer form data after successful submission
            setFormData({
              name: "",
              type: "",
              date: "",
              amount: "",
              categorie: "",
              files: null,
            });
            alert("Transaction saved successfully");
          } catch (error) {
            console.error("Error submitting form:", error);
            alert("Failed to save transaction. Please try again.");
          }
        }
      };

      submitForm();
    }, [formData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  
    if (name === 'file') {
      const fileName = files[0].name;
      document.querySelector('.file-text').textContent = fileName;
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      type: "",
      date: "",
      amount: "",
      categorie: "",
      files: null,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // check if all fields are filled
    const isFormValid = Object.values(formData).every((value) => !!value);

    if (isFormValid) {
      // Submit the form
      console.log("info of the form submitted:", formData);
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid>
          <Typography
            variant="h4"
            component="h4"
            sx={{
              textAlign: "left",
              mt: 3,
              mb: 3,
              color: "#148582",
              margin: "20px",
            }}
          >
            Ajouter une transaction:
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Concerné"
            name="name"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Somme"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            select
            label="categorie"
            name="categorie"
            value={formData.categorie}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            SelectProps={{
              native: true,
            }}
            required
          >
            <option value=""></option>
            <option value="sortant">Sortant</option>
            <option value="entrant">Entrant</option>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <div className="pdf-field">
            <label className="file-label">
              <input
                type="files"
                accept=".pdf"
                name="files"
                onChange={handleChange}
                required
                className="file-input"
              />
              <span className="file-icon">
                <InsertDriveFile />
              </span>
              <span className="file-text">Importer Le récépissé de dépot</span>
            </label>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCancel}
              >
                Annuler
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" type="submit">
                Valider
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default Transaction_form;
