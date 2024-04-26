import React from 'react';
import Header from '../Components/Header';
import Loantype from '../Components/Loantype';
import './Employeelist.css';
import Sidebar from '../Components/Sidebar';


const Employeelist = () => {
  return (
   
     <div className="containerdem"  style={{ backgroundColor: '#EAEDEF' }}>
      <Sidebar />
      <div className="contentdem">
        <Header className="header" />
        < Loantype/>
      </div>
  
 </div> );
};

export default Employeelist;
