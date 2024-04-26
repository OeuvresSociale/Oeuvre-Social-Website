import React from 'react';
import Header from '../Components/Header';
import Loanform from '../Components/Loanform';

import Sidebar from '../Components/Sidebar';


const LoanForm = () => {
  return (
   
     <div className="containerdem"  style={{ backgroundColor: '#EAEDEF' }}>
      <Sidebar />
      <div className="contentdem">
        <Header className="header" />
        < Loanform/>
      </div>
  
 </div> );
};

export default LoanForm;