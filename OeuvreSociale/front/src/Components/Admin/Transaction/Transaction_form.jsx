import React, { useState } from "react";
import { Grid, TextField, Button, Typography } from "@mui/material";
import { InsertDriveFile } from "@mui/icons-material";
import axios from "axios";
import "./Transaction_form.css";

const Transaction_form = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    date: "",
    Amount: "",
    categorie: "",
    files: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });

    if (name === "files" && files) {
      const fileName = files[0].name;
      document.querySelector(".file-text").textContent = fileName;
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      type: "",
      date: "",
      Amount: "",
      categorie: "",
      files: null,
    });
    document.querySelector(".file-text").textContent = "Importer Le récépissé de dépot";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    const isFormValid = Object.values(formData).every((value) => !!value);

    if (!isFormValid) {
      alert("Please fill in all fields.");
      return;
    }

    const formDataToSubmit = new FormData();
    for (const key in formData) {
      formDataToSubmit.append(key, formData[key]);
    }

    try {
      const response = await axios.post("http://localhost:8000/api/addTransaction", formDataToSubmit, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Form submitted:", response.data);
      // Clear form data after successful submission
      handleCancel();
      alert("Transaction saved successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to save transaction. Please try again.");
    }
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
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
            name="Amount"
            value={formData.Amount}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            select
            label="Direction"
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
            <option value="outcome">Sortant</option>
            <option value="income">Entrant</option>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <div className="pdf-field">
            <label className="file-label">
              <input
                type="file"
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
