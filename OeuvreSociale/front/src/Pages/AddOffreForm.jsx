import React from "react";
import'./Addoffre.css';

 import AddOffreForm from '../Components/Addoffreform';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';

const Addoffre = () => {
  return (
    <div>
     <div className="containeradd">
      <Sidebar  />
      <div className="contentadd">
        <Header  />
       <AddOffreForm />
      </div>
    </div>
 </div> );
};

export default Addoffre ;