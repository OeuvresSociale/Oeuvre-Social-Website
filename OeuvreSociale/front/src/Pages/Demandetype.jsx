import React from "react";
import'./Demandetype.css';

 import Demandetypes from '../Components/Demandetypes';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';

const Demandetype = () => {
  return (
    <div>
     <div className="containerdem">
      <Sidebar className='sidebar' />
      <div className="contentdem">
        <Header  />
       <Demandetypes  />
      </div>
    </div>
 </div> );
};

export default Demandetype ;
