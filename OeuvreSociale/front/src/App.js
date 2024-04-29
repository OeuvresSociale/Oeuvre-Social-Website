import React from 'react';
import Sidebar from './Components/Sidebar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Addemployee from './Pages/Addemployee.jsx';
import Employeelist from './Pages/Employeelist.jsx';
import Header from './Components/Header.jsx'
import './App.css'
import Usertable from './Components/Usertable.jsx';
import Formulaire from './Components/Formulaire.jsx';
import Modefyuser from './Components/Modefyuser.jsx';
import Deleteuser from './Components/Deleteuser.jsx';
import Addoffre from './Pages/Addoffre.jsx';
import Demandetype from './Pages/Demandetype.jsx';
import Formul from './Pages/Formul.jsx';
import Confirmformul from './Pages/Confirmformul.jsx';
import Login from './Pages/Login.jsx';
import Profile from './Pages/Profile.jsx';
import TableDemands from './Pages/TableDemands.jsx';
import Modefyformule from './Pages/Modefyformule.jsx';

import Recover from './Pages/Recover.jsx';
import Otp from './Pages/otp.jsx';
import New from './Pages/New.jsx';

import LoanType from './Pages/LoanType.jsx';
import LoanForm from './Pages/LoanForm.jsx';
import ModefyLoan from './Pages/ModefyLoan.jsx';
import Addloandemande from './Components/Addloandemande.jsx';
import AddOffreForm from './Pages/AddOffreForm.jsx';
import ValideDemands from './Pages/ValideDemands.jsx';
import OFFers from './Pages/OFFers.jsx';
import ValideOffres from './Pages/ValidOffres.jsx';
import UnvalideOffres from './Pages/UnvalideOffres.jsx';
import OffreType from './Pages/OffreType.jsx';






const App = () => {
  return (
    <BrowserRouter >

    
   
<Routes>
  <Route path='/employeelist/Addemployee' element={<Addemployee />} />
  <Route path='/employeelist' element={<Employeelist />} />

 <Route path='/formulaire/formulairedemande' element={<Addoffre />} />
 <Route path='/tables/demandetype' element={<Demandetype />} />
 <Route path='/formulaire' element={<Formul />} />
 <Route path='/formulaire/formulairedemande/confirmformulaire' element={<Confirmformul />} />

 <Route path='/profile' element={<Profile />} />
 <Route path='/tables' element={<TableDemands />} />
 <Route path='/tables/loantype' element={<LoanType />} />
 <Route path='/formulaire/formulairedemande/modefyformulaire' element={<Modefyformule />} />

 <Route path='/login' element={<Login />} />
 <Route path='/recover' element={<Recover />} />
 <Route path='/otp' element={<Otp />} />
 <Route path='/new' element={<New />} />

 <Route path='/formulaire/formulairepret' element={<LoanForm />} />
 <Route path='/formulaire/formulairepret/modifierpret' element={<ModefyLoan />} />
 <Route path='/formulairetable/ajouterpret' element={<Addloandemande/>} />
 <Route path='/formulaire/ajouteroffre/offreformulaire' element={<AddOffreForm/>} />
 <Route path='/demandevalid' element={<ValideDemands />} />
 <Route path='/formulaire/ajouteroffre' element={<OFFers/>} />
 <Route path='/formulaire/ajouteroffre/offresvalides' element={<ValideOffres/>} />
 <Route path='/formulaire/ajouteroffre/offresunvalides' element={<UnvalideOffres/>} />
 <Route path='/formulaire/ajouteroffre/offretype' element={<OffreType/>} />

</Routes>


</BrowserRouter>
    
  );
};

export default App;


    
   

