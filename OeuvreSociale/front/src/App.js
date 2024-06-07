import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate,useNavigate } from "react-router-dom";
import Addemployee from "./Pages/Addemployee.jsx";
import Employeelist from "./Pages/Employeelist.jsx";
import Addoffre from "./Pages/Addoffre.jsx";
import Demandetype from "./Pages/Demandetype.jsx"; // Correct import
import Formul from "./Pages/Formul.jsx";
import Confirmformul from "./Pages/Confirmformul.jsx";
import Login from "./Pages/Login.jsx";
import Profile from "./Pages/Profile.jsx";
import TableDemands from "./Pages/TableDemands.jsx";
import Modefyformule from "./Pages/Modefyformule.jsx";
import Recover from "./Pages/Recover.jsx";
import OTP from "./Pages/OTP.jsx";
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
import UnvalideOffretype from "./Pages/UnvalideOffretype.jsx";
import Transaction from "./Pages/Admin/Transaction/Transaction.jsx";
import CreeLoan from "./Pages/CreeLoan.jsx";
import Loan from "./Pages/Loan.jsx";
import FormularTab from "./Pages/FormularTab.jsx";
import Dashboard from "./Pages/Admin/Dashboard/Dashboard.jsx";
import Reunionpage from "./Pages/Reunionpage.jsx";
import ModefyFormtitle from "./Components/ModefyFormtitle.jsx";
import Contact from "./Pages/Employee/home/Contact.jsx";
import Home from "./Pages/Employee/home/home.jsx";
import Historique from "./Pages/Admin/Meeting/Historique.jsx";
import LastYearsMeeting from "./Pages/Admin/Meeting/LastYearsMeeting.jsx";

const App = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const getRole = localStorage.getItem('userRole');
    setRole(getRole);
    
    //console.log("role:",getRole);
    //setRole('admin');
     //setRole('employee');


  }, []);
  

  const GeneralRoute = () => {
    if (!role) {
      return (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/recover" element={<Recover />} />
          <Route path="/OTP" element={<OTP />} />
          <Route path="/new" element={<New />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      );
    }


if (role === 'employe') {
      return (
        <Routes>
          <Route path="/FormularTab" element={<FormularTab />} />
          <Route path="/offresvalides" element={<ValideOffres />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/offre/:id" element={<OffreType />} />
          <Route path="*" element={<Navigate to="/FormularTab" />} />
        </Routes>
      );
    } else {
      return (
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employeelist" element={<Employeelist />} />
          <Route path="/employeelist/Addemployee" element={<Addemployee />} />
          <Route path="/tables" element={<TableDemands />} />
          <Route path="/tables/demandetype/:id" element={<Demandetype />} />
          <Route path="/tables/loantype/:id" element={<LoanType />} />
          <Route path="/Loan" element={<Loan />} />
          <Route path="/formulaire" element={<Addoffre />} />
          <Route path="/formulaire/formulairedemande/confirmformulaire" element={<Confirmformul />} />
          <Route path="/formulaire/formulairedemande/modefyformulaire" element={<Modefyformule />} />
          <Route path="/formulaire/modefyformtitle" element={<ModefyFormtitle />} />
          <Route path="/FormularTab" element={<FormularTab />} />
          <Route path="/formulairetable/ajouterpret" element={<Addloandemande />} />
          <Route path="/formulaire/formulairepret" element={<LoanForm />} />
          <Route path="/formulaire/formulairepret/modifierpret" element={<ModefyLoan />} />
          <Route path="/formulaire/formulairepret/creepret" element={<CreeLoan />} />
          <Route path="/UnvalideOffres/ajouteroffre" element={<AddOffreForm />} />
          <Route path="/offresvalides" element={<ValideOffres />} />
          <Route path="/UnvalideOffres" element={<UnvalideOffres />} />
          <Route path="/offre/:id" element={<OffreType />} />
          <Route path="/UnvalideOffres/UnvalideOffrestype" element={<UnvalideOffretype />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/demandevalid" element={<Demande_Valid />} />
          <Route path="/reunions" element={<Reunionpage />} />
          <Route path="/reunions/historique" element={<Historique />} />
          <Route path="/reunions/historique/listreunion/:year" element={<LastYearsMeeting />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      );
    }
  };

  return (
    <BrowserRouter>
      {GeneralRoute()}

    </BrowserRouter>
  );
};

export default App;