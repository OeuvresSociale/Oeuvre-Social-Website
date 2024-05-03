import React from 'react';
import Header from '../Components/Header';
import Creeloan from '../Components/Creeloan';
import './Employeelist.css';
import Sidebar from '../Components/Sidebar';


const Employeelist = () => {
  return (
   
     <div className="containerdem"  style={{ backgroundColor: '#EAEDEF' }}>
      <Sidebar />
      <div className="contentdem">
        <Header className="header" />
        < Creeloan/>
      </div>
  
 </div> );
};

export default Employeelist;