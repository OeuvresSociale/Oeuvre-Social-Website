import React from "react";
//import'./Addemployee.css';
import App from "../Components/addImage"
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

const Images = () => {
  return (
    <div>
      <div className="containerf">
        <Sidebar />
        <div className="contentf">
          <Header />
          <div className='content'>
          <h1>HELLO WORLD</h1><br/>
          <h1>HELLO WORLD</h1><br/>
          <App /> 
           </div>
        </div>
      </div>
    </div>
  );
};

export default Images;
