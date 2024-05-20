import React, { useState, useEffect } from "react";
import { Button, Grid, Alert } from "@mui/material";
import axios from "axios";
import "../Styles/Formulaire.css";

const Formulaire = () => {
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
    e.preventDefault(); // Prevent page refresh
    try {
      await axios.post("http://localhost:8000/api/register", inputs);
      setErr(null); // Clear error if request is successful
    } catch (error) {
      const errorMessage = error.response && error.response.data ? error.response.data : "An error occurred";
      setErr(errorMessage);
    }
  };

  return (
    <div className="formulaire">
      {err && (
        <Alert severity="error" onClose={() => setErr(null)}>
          {err}
        </Alert>
      )}
      <div className="f1">
        <div style={{ width: "50%" }} className="f2">
          <input
            type="text"
            name="familyName"
            placeholder="Nom"
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ width: "50%" }} className="f2">
          <input
            type="text"
            name="firstName"
            placeholder="Prénom"
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="f1">
        <div style={{ width: "33%" }}>
          <div className="f2">
            <input
              type="text"
              name="idEmployee"
              placeholder="ID"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div style={{ width: "33%" }} className="f2">
          <input
            name="monthlySalary"
            placeholder="Salaire"
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ width: "33%" }} className="f2">
          <input
            style={{ width: "240px" }}
            type="date"
            name="dateStartJob"
            placeholder="date de recrutement"
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="f1">
        <div style={{ width: "50%" }}>
          <div className="f2">
            <input
              type="text"
              name="email"
              placeholder="address email"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div style={{ width: "50%" }}>
          <div className="f2">
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>
      <div className="f1">
        <div style={{ width: "100%" }}>
          <div className="f2">
            <input
              type="text"
              name="bankAccount"
              placeholder="compte bancaire"
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>
      <div className="f1">
        <div style={{ width: "33%" }} className="f2">
          <div className="select-container">
            <select
              id="gender"
              name="gender"
              value={selectedGender}
              onChange={handleGenderChange}
              required
            >
              <option value="">sexe</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <div style={{ width: "33%" }} className="f2">
          <div className="select-container">
            <select
              id="sitfam"
              name="sitfam"
              value={selectedsitfam}
              onChange={handlesitfamChange}
              required
            >
              <option value="">situation familialle</option>
              <option value="Marie">Marié</option>
              <option value="celibataire">célibataire</option>
            </select>
          </div>
        </div>
        <div style={{ width: "33%" }} className="f2">
          <div className="select-container">
            <select
              id="role"
              name="role"
              value={selectedrole}
              onChange={handleroleChange}
              required
            >
              <option value="">rôle</option>
              <option value="president">président</option>
              <option value="tresorerie">trésorerie</option>
              <option value="membre">membre</option>
              <option value="employe">employé</option>
            </select>
          </div>
        </div>
      </div>
      <div className="f1">
        {selectedsitfam === "Marie" && (
          <div style={{ width: "200px", marginLeft: "35%" }} className="f2">
            <input
              type="text"
              name="numberOfChild"
              placeholder="nombre d'enfants"
              onChange={handleChange}
            />
          </div>
        )}
        <Grid item xs={12} className="popup_button">
          <Grid container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <Button variant="contained" color="secondary">
                Annuler
              </Button>
              <Button variant="contained" color="primary" onClick={handleClick}>
                Enregistrer
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Formulaire;
