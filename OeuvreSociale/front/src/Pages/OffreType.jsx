import React from "react";
import'./Addoffre.css';

 import Offretype from '../Components/Offretype';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';

const OffreType = () => {
  return (
    <div>
     <div className="containeradd">
      <Sidebar  />
      <div className="contentadd">
        <Header  />
       <Offretype />
      </div>
    </div>
 </div> );
};

export default OffreType ;