import React from "react";
import Meeting from '../Components/Meeting';
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

const Reunionpage = () => {
  return (
    
      <div className="containerdem">
        <Sidebar />
        <div className="contentdem">
          <Header />
          <Meeting />
        </div>
       
    </div>

  );
};

export default Reunionpage;
