import React from 'react';
import Header from '../Components/Header';
import Formuls from '../Components/Formuls';

import './Formul.css';
import Sidebar from '../Components/Sidebar';



const Formul = () => {
  return (
   
     <div className="containerf"  style={{ backgroundColor: '#EAEDEF' }}>
      <Sidebar />
      <div className="contentf">
        <Header className="header" />
        <Formuls  />
      </div>
  
 </div> );
};

export default Formul;