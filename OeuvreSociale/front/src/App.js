import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
import ValideDemands from "./Pages/ValideDemands.jsx";
import OFFers from "./Pages/OFFers.jsx";
import ValideOffres from "./Pages/ValidOffres.jsx";
import UnvalideOffres from "./Pages/UnvalideOffres.jsx";
import OffreType from "./Pages/OffreType.jsx";
import Archive from "./Pages/Archive.jsx";
import Dashboard from "./Pages/Admin/Dashboard/Dashboard.jsx";
import Transaction from "./Pages/Transaction.jsx";
import Tdashboard from "./Pages/Tresorerie_Dashboard.jsx";
import CreeLoan from "./Pages/CreeLoan.jsx";
import Loan from "./Pages/Loan.jsx";
import FormularTab from "./Pages/FormularTab.jsx";

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
        <Route path="/tables/loantype" element={<LoanType />} />
        <Route path="/Loan" element={<Loan />} />

        {/* ..............Offre Tabele.............................................................................. */}

        {/* Formulaire.............................................................................. */}
        <Route path="/formulaire" element={<Formul />} />
        {/* ..............Damande Formular.............................................................................. */}
        <Route path="/formulaire/formulairedemande" element={<Addoffre />} />
        <Route
          path="/formulaire/formulairedemande/confirmformulaire"
          element={<Confirmformul />}
        />
        <Route
          path="/formulaire/formulairedemande/modefyformulaire"
          element={<Modefyformule />}
        />
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
          path="/formulaire/ajouteroffre/offreformulaire"
          element={<AddOffreForm />}
        />
        <Route path="/formulaire/ajouteroffre" element={<OFFers />} />
        <Route
          path="/formulaire/ajouteroffre/offresvalides"
          element={<ValideOffres />}
        />
        <Route
          path="/formulaire/ajouteroffre/offresunvalides"
          element={<UnvalideOffres />}
        />
        <Route
          path="/formulaire/ajouteroffre/offretype"
          element={<OffreType />}
        />

        {/* Tresorerie.............................................................................. */}

        {/* ........Tresorier Dashboard..............................................................*/}
        <Route path="/tresorerie_dashboard" element={<Tdashboard />} />

        {/* ........Transaction table..............................................................*/}
        <Route path="/transaction" element={<Transaction />} />

        {/* ........Accepted demande..............................................................*/}
        <Route path="/demandevalid" element={<ValideDemands />} />

        {/* Archive.............................................................................. */}
        <Route path="/Archive" element={<Archive />} />

        {/* 3-Employee part.............................................................................. */}

        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
