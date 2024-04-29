
import React from 'react';
import Header from '../Components/Header';
import Validedemands from '../Components/Validedemands';
import './Employeelist.css';
import Sidebar from '../Components/Sidebar';


const Employeelist = () => {
  return (
   
     <div className="containerf" >
      <Sidebar />
      <div className="contentf">
        <Header className="header" />
        <Validedemands  />
      </div>
  
 </div> );
};



export default Employeelist;