import React from 'react';
import Menu from '../Components/Menu';
import  LoanTable from  '../Components/LoanTable';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import '../Styles/Tabledemandes.css';
const Loan = () => {
    return (
      <div className='containerdem'>
        <Sidebar/>
        <div className='contentdem'>
          <Header/> 
        <div className="Infos-section">
          <Menu />
        </div>
        <div className="Demand-section">
        <LoanTable/>
        </div>
        </div></div>
);
    };
    
    export default Loan;
    