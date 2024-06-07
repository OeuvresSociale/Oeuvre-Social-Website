import React, { useState,useEffect } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import EmployeeList_Table from "../Components/tabeles/employeeList_Table";
import Page_Header from "../Components/Admin/bar_menu/Page_Header";
import "../Styles/Admin/global/structureDuPage.css";
import { IoPersonAddOutline } from "react-icons/io5";
import Formulaire from "../Components/Formulaire";
import Button from "@mui/material/Button";
import "../Styles/Formulaire.css";

const Employeelist = () => {
  const [showForm, setShowForm] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const getRole = localStorage.getItem('role');
    // setRole(getRole);
     setRole('president');
    //setRole('admin');
  }, []);

  const FormVisibility = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  return (
    <div className="body_space">
      <Sidebar />
      <div className="dataContainer">
        <Header />
        <div>
          <Page_Header
            title="Liste des Employees"
            // subtitle="hnaya la liste t3 les employee sahbi"
          />
          <div>
          {role === 'president' && (
            <Button variant="contained" color="primary" onClick={FormVisibility}>
                <IoPersonAddOutline />
            </Button>
          )}
            {showForm && <Formulaire FormVisibility={FormVisibility} />}
          </div>
        </div>
        <div className="componentContainer">
          <EmployeeList_Table />
        </div>
      </div>
    </div>
  );
};

export default Employeelist;
