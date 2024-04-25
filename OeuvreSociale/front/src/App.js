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
import LoanType from './Pages/LoanType.jsx';
import LoanForm from './Pages/LoanForm.jsx';
import ModefyLoan from './Pages/ModefyLoan.jsx';





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
 <Route path='/login' element={<Login />} />
 <Route path='/profile' element={<Profile />} />
 <Route path='/tables' element={<TableDemands />} />
 <Route path='/tables/loantype' element={<LoanType />} />
 <Route path='/formulaire/formulairedemande/modefyformulaire' element={<Modefyformule />} />
 <Route path='/formulaire/formulairepret' element={<LoanForm />} />
 <Route path='/formulaire/formulairepret/modifierpret' element={<ModefyLoan />} />

</Routes>


</BrowserRouter>
    
  );
};

export default App;


    
   

