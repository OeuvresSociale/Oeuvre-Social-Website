import React, { useState, useEffect } from "react";
import "../../../Styles/Admin/global/structureDuPage.css";
import Sidebar from "../../../Components/Sidebar.jsx";
import Transaction_Table from "../../../Components/tabeles/Transaction_Table.jsx";
import Transaction_form from "../../../Components/Admin/Transaction/Transaction_form.jsx";
import Header from "../../../Components/Header.jsx";
import Page_Header from "../../../Components/Admin/bar_menu/Page_Header.jsx";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';

const Transaction = () => {
  const [showForm, setShowForm] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const getRole = localStorage.getItem('role');
    // setRole(getRole);
    setRole('president');
<<<<<<< HEAD
   // setRole('admin');
=======
    //setRole('admin');
>>>>>>> origin/Manel
  }, []);

  const FormVisibility = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  return (
    <div>
      <div className="body_space">
        <Sidebar />
        <div className="dataContainer">
          <Header />
          <div className="flex-container">
            <Page_Header title="Table de Transaction" subtitle="Sous titre" />
            <div className="BTN">
              {role === 'president' && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={FormVisibility}
                >
                  <AddCircleOutlineIcon />
                </Button>
              )}
               <Button
                  variant="contained"
                  color="primary"
                  onClick={FormVisibility}
                >
                  <AddCircleOutlineIcon />
                </Button>
            </div>
            
          </div>
          {showForm && <Transaction_form FormVisibility={FormVisibility} />}
          <div className="componentContainer">
            <Transaction_Table />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
