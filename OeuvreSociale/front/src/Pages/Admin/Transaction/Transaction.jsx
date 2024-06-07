import React, { useState, useEffect } from "react";
import "../../../Styles/Admin/global/structureDuPage.css";
import Sidebar from "../../../Components/Sidebar.jsx";
import Transaction_Table from "../../../Components/tabeles/Transaction_Table.jsx";
import Transaction_form from "../../../Components/Admin/Transaction/Transaction_form.jsx";
import Header from "../../../Components/Header.jsx";
import Page_Header from "../../../Components/Admin/bar_menu/Page_Header.jsx";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DownloadIcon from '@mui/icons-material/Download';
import BilanPopup from "../../../Components/popups/BilanPopup.jsx";
import Button from "@mui/material/Button";
import axios from 'axios';

const Transaction = () => {
  const [showForm, setShowForm] = useState(false);
  const [role, setRole] = useState(null);
  const [open, setOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDownload = async(fromDate, toDate) => {
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

  useEffect(() => {
    const getRole = localStorage.getItem("role");
    setRole(getRole || "president");

    // Fetch transactions (mock example)
    const fetchedTransactions = [
      { id: 1, date: '2023-06-01', amount: 100 },
      { id: 2, date: '2023-06-02', amount: 200 },
    ];
    setTransactions(fetchedTransactions);
  }, []);

  const FormVisibility = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  console.log('Role:', role);
  console.log('Transactions:', transactions);

  return (
    <div>
      <div className="body_space">
        <Sidebar />
        <div className="dataContainer">
          <Header />
          <div className="flex-container">
            <Page_Header title="Table de Transaction" subtitle="Sous titre" />
            <div className="BTN">
              {role === "president" && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={FormVisibility}
                >
                  <AddCircleOutlineIcon />
                </Button>
              )}
              <Button variant="contained" color="primary" onClick={handleOpen}>
                <DownloadIcon />
              </Button>
              <BilanPopup
                open={open}
                handleClose={handleClose}
               
                handleDownload={handleDownload}
              />
            </div>
          </div>
          {showForm && <Transaction_form FormVisibility={FormVisibility} />}
          <div className="componentContainer">
            <Transaction_Table transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;