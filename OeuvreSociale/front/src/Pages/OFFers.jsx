import React from "react";
import'./Addoffre.css';

 import Offers from '../Components/Offers';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';

const Addoffre = () => {
  return (
    <div>
     <div className="containeradd">
      <Sidebar  />
      <div className="contentadd">
        <Header  />
       <Offers />
      </div>
    </div>
 </div> );
};

export default Addoffre ;
