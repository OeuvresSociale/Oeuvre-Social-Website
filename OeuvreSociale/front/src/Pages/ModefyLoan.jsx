import React from 'react';
import Header from '../Components/Header';
import Modefyloan from '../Components/Modefyloan';

import Sidebar from '../Components/Sidebar';


const Employeelist = () => {
  return (
   
     <div className="containerdem"  style={{ backgroundColor: '#EAEDEF' }}>
      <Sidebar />
      <div className="contentdem">
        <Header className="header" />
        < Modefyloan/>
      </div>
  
 </div> );
};

export default Employeelist;