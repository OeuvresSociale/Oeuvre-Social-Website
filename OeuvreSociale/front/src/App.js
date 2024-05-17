import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import layout
//import AdminLayout from './AdminLayout';
//import ClientLayout from './ClientLayout';

import Addemployee from "./Pages/Addemployee.jsx";
import Employeelist from "./Pages/Employeelist.jsx";
import Addoffre from "./Pages/Addoffre.jsx";
import Demandetype from "./Pages/Demandetype.jsx";
import Formul from "./Pages/Formul.jsx";
import Confirmformul from "./Pages/Confirmformul.jsx";
import Login from "./Pages/Login.jsx";
import Profile from "./Pages/Profile.jsx";
import TableDemands from "./Pages/TableDemands.jsx";
import Modefyformule from "./Pages/Modefyformule.jsx";
import Recover from "./Pages/Recover.jsx";
import Otp from "./Pages/otp.jsx";
import New from "./Pages/New.jsx";
import LoanType from "./Pages/LoanType.jsx";
import LoanForm from "./Pages/LoanForm.jsx";
import ModefyLoan from "./Pages/ModefyLoan.jsx";
import Addloandemande from "./Components/Addloandemande.jsx";
import AddOffreForm from "./Pages/AddOffreForm.jsx";
import Demande_Valid from "./Pages/Admin/Demande_valide/Demande_Valide.jsx";
import OFFers from "./Pages/OFFers.jsx";
import ValideOffres from "./Pages/ValidOffres.jsx";
import UnvalideOffres from "./Pages/UnvalideOffres.jsx";
import OffreType from "./Pages/OffreType.jsx";
import UnvalideOffreType from "./Pages/UnvalideOffretype.jsx";

import Transaction from "./Pages/Admin/Transaction/Transaction.jsx";

import CreeLoan from "./Pages/CreeLoan.jsx";
import Loan from "./Pages/Loan.jsx";
import FormularTab from "./Pages/FormularTab.jsx";
import Dashboard from "./Pages/Admin/Dashboard/Dashboard.jsx";

import Reunionpage from "./Pages/Reunionpage.jsx";

import ModefyFormtitle from "./Components/ModefyFormtitle.jsx";

import Home from "./Pages/Employee/home/home.jsx";



const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        {/* 1-Login Page.............................................................................. */}
      
        <Route path="/login" element={<Login />} />
        <Route path="/recover" element={<Recover />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/new" element={<New />} />

        {/* 2-Admin part.............................................................................. */}
        {/* Admin Dashboard.............................................................................. */}

       <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Employee.............................................................................. */}
        <Route path="/employeelist" element={<Employeelist />} />
        <Route path="/employeelist/Addemployee" element={<Addemployee />} />

        {/* Tabeles.............................................................................. */}

        <Route path="/tables/demandetype/:id" element={<Demandetype />} />
        <Route path="/tables" element={<TableDemands />} />

        {/* ..............Damande Tabele.............................................................................. */}
        {/* .............loan Tabele.............................................................................. */}
        <Route path="/tables/loantype/:id" element={<LoanType />} /> 
        <Route path="/Loan" element={<Loan />} />

        {/* ..............Offre Tabele.............................................................................. */}

        {/* Formulaire.............................................................................. */}
        <Route path="/formulaire" element={<Addoffre />} />
        {/* ..............Damande Formular.............................................................................. */}
       
        <Route
          path="/formulaire/formulairedemande/confirmformulaire"
          element={<Confirmformul />}
        />
        <Route
          path="/formulaire/formulairedemande/modefyformulaire"
          element={<Modefyformule />}
        />
        <Route path="/formulaire/modefyformtitle" element={<ModefyFormtitle/>} />
        
        <Route path="/FormularTab" element={<FormularTab />} />

        {/* .............loan Formular.............................................................................. */}
        <Route
          path="/formulairetable/ajouterpret"
          element={<Addloandemande />}
        />
        
        <Route path="/formulaire/formulairepret" element={<LoanForm />} />
        <Route
          path="/formulaire/formulairepret/modifierpret"
          element={<ModefyLoan />}
        />
        <Route
          path="/formulaire/formulairepret/creepret"
          element={<CreeLoan />}
        />

        {/* ..............Offre Formular............................................................................... */}

        <Route
         path="/unvalideoffres/ajouteroffre"   // where to create new offre
          element={<AddOffreForm />}
        />
        <Route
         path="/offresvalides"     //all valide offres page 
          element={<ValideOffres />} 
        /> 
        <Route
        path="/unvalideoffres"    // all unvalide offres page
          element={<UnvalideOffres />}
        />
        <Route
          path="/offre/:id"  //  when u click on a valide offre 
          element={<OffreType />}
        />
        <Route
          path="/unvalideoffretype"
          element={<UnvalideOffreType />}   //    when u click on an unvalide offre 
        />


        {/* Tresorerie.............................................................................. */}
        {/* ........Transaction table..............................................................*/}
        <Route path="/transaction" element={<Transaction />} />

        {/* ........Accepted demande..............................................................*/}
        <Route path="/demandevalid" element={<Demande_Valid />} />


        {/* Meeting.............................................................................. */}
        <Route path="Reunionpage" element={<Reunionpage />} />

        {/* 3-Employee part.............................................................................. */}


        <Route path="/profile/:id" element={<Profile />} />
{/* ----------------------- */}

        {/* <Route path="/image" element={<Images />} /> */}

      

        {/* 3-Employee part.............................................................................. */}

        <Route path ="/home" element={< Home />}/>
     
        <Route path="/profile/:id" element={<Profile />} />
{/* ----------------------- */}

        

      
      </Routes>
    </BrowserRouter>
  );
};

export default App;