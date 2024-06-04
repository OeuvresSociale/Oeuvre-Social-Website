import React from "react";
import Historique from '../../../Components/Admin/Meeting/Historique';
import Header from "../../../Components/Header";
import Sidebar from "../../../Components/Sidebar";

const Reunionpage = () => {
  return (
    
      <div className="containerdem">
        <Sidebar />
        <div className="contentdem">
          <Header />
          <Historique/>
        </div>
       
    </div>

  );
};

export default Reunionpage;
