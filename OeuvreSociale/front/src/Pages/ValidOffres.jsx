import React from "react";
import'./Addoffre.css';

 import Valideoffres from '../Components/Valideoffres';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';

const ValideOffres = () => {
  return (
    <div>
     <div className="containeradd">
      <Sidebar  />
      <div className="contentadd">
        <Header  />
       <Valideoffres />
      </div>
    </div>
 </div> );
};

export default ValideOffres ;
