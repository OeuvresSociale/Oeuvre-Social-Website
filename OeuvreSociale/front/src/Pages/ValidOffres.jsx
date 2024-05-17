import React from "react";
import'./Addoffre.css';

 import Valideoffres from '../Components/Valideoffres';
import Header from '../Components/Header';
import SidebarEmployee from '../Components/SidebarEmployee';

const ValideOffres = () => {
  return (
    <div>
     <div className="containeradd">
      <SidebarEmployee  />
      <div className="contentadd">
        <Header  />
       <Valideoffres />
      </div>
    </div>
 </div> );
};

export default ValideOffres ;
