import React, { useState , useEffect} from "react";
import { Grid, TextField, Button, Typography} from "@mui/material";
import "./Transaction_form.css";
// import axios from "axios"; // Import Axios library
import { InsertDriveFile } from '@mui/icons-material';

const Transaction_form = () => {
    const [formData, setFormData] = useState({
      concerned: "",
      type: "",
      date: "",
      amount: "",
      direction: "",
      file: null,
    });

    


// useEffect(() => {
//     const submitForm = async () => {
//       if (formData.concerned && formData.type && formData.date && formData.amount && formData.direction && formData.file) {
//         try {
//           const response = await axios.post("/api/transactions", formData);
//           console.log("Form submitted:", response.data);
//           // Clear form data after successful submission
//           setFormData({
//             concerned: "",
//             type: "",
//             date: "",
//             amount: "",
//             direction: "",
//             file: null,
//           });
//           alert("Transaction saved successfully");
//         } catch (error) {
//           console.error("Error submitting form:", error);
//           alert("Failed to save transaction. Please try again.");
//         }
//       }
//     };

//     submitForm();
//   }, [formData]);



  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleCancel = () => {
    setFormData({
      concerned: "",
      type: "",
      date: "",
      amount: "",
      direction: "",
      file: null,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if all fields are filled
    const isFormValid = Object.values(formData).every((value) => !!value);

    if (isFormValid) {
      // Submit the form
      console.log("Form submitted:", formData);
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
            name="concerned"
            value={formData.concerned}
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
            label="Direction"
            name="direction"
            value={formData.direction}
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
                  type="file"
                  accept=".pdf"
                  name="file"
                  onChange={handleChange}
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
