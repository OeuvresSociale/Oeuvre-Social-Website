import React from "react";
import'./Confirmformul.css';


import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import Confirmform from "../Components/Confirmform";

const Confirmformul = () => {
  return (
    <div>
     <div className="containerf">
      <Sidebar  />
      <div className="contentf">
        <Header  />
       <Confirmform className='form'/>
      </div>
    </div>
 </div> );
};

export default Confirmformul ;
