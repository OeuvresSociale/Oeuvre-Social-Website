import React, { useState, useEffect } from "react";
import { Button, Grid, Alert, AlertTitle } from "@mui/material";
import axios from "axios";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import "../Styles/Formulaire.css";

const Formulaire = ({FormVisibility}) => {
  const [inputs, setInputs] = useState({
    idEmployee: "",
    familyName: "",
    firstName: "",
    email: "",
    phoneNumber: "",
    sexe: "",
    familysitution: "",
    numberOfChild: "",
    bankAccount: "",
    monthlySalary: "",
    dateStartJob: "",
    password: "",
    role: "",
  });

  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(null);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedrole, setSelectedrole] = useState("");
  const [selectedsitfam, setSelectedsitfam] = useState("");

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };

  const handleroleChange = (e) => {
    setSelectedrole(e.target.value);
  };

  const handlesitfamChange = (e) => {
    setSelectedsitfam(e.target.value);
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      sexe: selectedGender,
      role: selectedrole,
      familysitution: selectedsitfam,
    }));
  }, [selectedGender, selectedrole, selectedsitfam]);

  const handleClick = async (e) => {
    try {
      await axios.post("http://localhost:8000/api/register", inputs);
      setSuccess("Employee registered successfully!");
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data
          : "An error occurred";
      setErr(errorMessage);
      setSuccess(null);
      setTimeout(() => setErr(null), 1500);
    }
  };

  return (
    <div>
      {err && (
        <Alert
          severity="error"
          onClose={() => setErr(null)}
          sx={{ position: "fixed", top: 0, width: "100%", zIndex: 1000 }}
        >
          <AlertTitle>Error</AlertTitle>
          {err}
        </Alert>
      )}
      {success && (
        <Alert
          severity="success"
          onClose={() => setSuccess(null)}
          sx={{ position: "fixed", top: 0, width: "100%", zIndex: 1000 }}
        >
          <AlertTitle>Success</AlertTitle>
          {success}
        </Alert>
      )}
      <div className="formulaire">
        <div className="f1">
          <div style={{ width: "50%" }} >
            <TextField
              className="textfieldStyle"
              fullWidth
              label="Nom"
              name="familyName"
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ width: "50%" }} >
            <TextField
              fullWidth
              label="Prénom"
              name="firstName"
              onChange={handleChange}
              required
              className="textfieldStyle"
            />
          </div>
        </div>
        <div className="f1">
          <div style={{ width: "33%" }}>
            <div >
              <TextField
                fullWidth
                label="ID"
                name="idEmployee"
                onChange={handleChange}
                required
                className="textfieldStyle"
              />
            </div>
          </div>
          <div style={{ width: "33%" }} >
            <TextField
              fullWidth
              label="Salaire"
              name="monthlySalary"
              type="number"
              onChange={handleChange}
              required
              className="textfieldStyle"
            />
          </div>
          <div style={{ width: "33%" }} >
            <TextField
              fullWidth
              type="date"
              label="Date de recrutement"
              name="dateStartJob"
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
              required
              className="textfieldStyle"
            />
          </div>
        </div>
        <div className="f1">
          <div style={{ width: "50%" }}>
            <div >
              <TextField
                fullWidth
                label="Adresse email"
                name="email"
                type="email"
                onChange={handleChange}
                required
                className="textfieldStyle"
              />
            </div>
          </div>
          <div style={{ width: "50%" }}>
            <div >
              <TextField
                fullWidth
                label="Numéro de téléphone"
                name="phoneNumber"
                type="tel"
                onChange={handleChange}
                required
                className="textfieldStyle"
              />
            </div>
          </div>
        </div>
        <div className="f1">
          <div style={{ width: "100%" }}>
            <div >
              <TextField
                fullWidth
                label="Compte bancaire"
                name="bankAccount"
                type="text"
                onChange={handleChange}
                required
                className="textfieldStyle"
              />
            </div>
          </div>
        </div>
        <div className="f1">
          <div style={{ width: "33%" }} >
            <div className="select-container">
              <TextField
                select
                fullWidth
                label="Sexe"
                name="gender"
                value={selectedGender}
                onChange={handleGenderChange}
                required
                className="textfieldStyle"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </TextField>
            </div>
          </div>
          <div style={{ width: "33%" }} >
            <div className="select-container">
            <TextField
            select
            fullWidth
            label="Situation familiale"
            name="sitfam"
            value={selectedsitfam}
            onChange={handlesitfamChange}
            required
            className="textfieldStyle"
          >
            <MenuItem value="Marie">Marié</MenuItem>
            <MenuItem value="celibataire">célibataire</MenuItem>
          </TextField>
            </div>
          </div>
          <div style={{ width: "33%" }} >
            <div className="select-container">
            <TextField
            select
            fullWidth
            label="Rôle"
            name="role"
            value={selectedrole}
            onChange={handleroleChange}
            required
            className="textfieldStyle"
          >
            <MenuItem value="president">président</MenuItem>
            <MenuItem value="tresorerie">trésorerie</MenuItem>
            <MenuItem value="membre">membre</MenuItem>
            <MenuItem value="employe">employé</MenuItem>
          </TextField>
            </div>
          </div>
        </div>
        <div className="f1">
          {selectedsitfam === "Marie" && (
            <div style={{ width: "200px", marginLeft: "35%" }} >
             <TextField
              fullWidth
              label="Nombre d'enfants"
              name="numberOfChild"
              type="number"
              onChange={handleChange}
              className="textfieldStyle"
            />
            </div>
          )}
          <Grid item xs={12} className="popup_button">
            <Grid container justifyContent="flex-end" spacing={2}>
              <Grid item>
                <Button variant="contained" color="secondary" onClick={FormVisibility}>
                  Annuler
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClick}
                >
                  Enregistrer
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Formulaire;
