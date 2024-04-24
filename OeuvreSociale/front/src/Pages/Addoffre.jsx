import React from "react";
import'./Addoffre.css';

 import Addform from '../Components/Addform';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';

const Addoffre = () => {
  return (
    <div>
     <div className="containeradd">
      <Sidebar  />
      <div className="contentadd">
        <Header  />
       <Addform className='form'/>
      </div>
    </div>
 </div> );
};

export default Addoffre ;
