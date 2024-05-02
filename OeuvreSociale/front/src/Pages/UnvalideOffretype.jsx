import React from "react";
import'./Addoffre.css';

 import Unvalideoffretype from '../Components/Unvalideoffretype';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';

const Addoffre = () => {
  return (
    <div>
     <div className="containeradd">
      <Sidebar  />
      <div className="contentadd">
        <Header  />
       <Unvalideoffretype />
      </div>
    </div>
 </div> );
};

export default Addoffre ;