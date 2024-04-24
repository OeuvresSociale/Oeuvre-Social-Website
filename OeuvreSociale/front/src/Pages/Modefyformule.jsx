import React from "react";


import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import Modefyform from "../Components/Modefyform";

const Confirmformul = () => {
  return (
    <div>
     <div className="containerf">
      <Sidebar  />
      <div className="contentf">
        <Header  />
       <Modefyform/>
      </div>
    </div>
 </div> );
};

export default Confirmformul ;
