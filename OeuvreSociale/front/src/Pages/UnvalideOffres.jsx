import React from "react";
import'./Addoffre.css';

 import Unvalideoffres from '../Components/Unvalideoffres';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';

const UnvalideOffres = () => {
  return (
    <div>
     <div className="containeradd">
      <Sidebar  />
      <div className="contentadd">
        <Header  />
       <Unvalideoffres />
      </div>
    </div>
 </div> );
};

export default UnvalideOffres ;
