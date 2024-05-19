import React from "react";
import LasrYearsMeetings from '../../../Components/Admin/Meeting/LastYearsMeetings';
import Header from "../../../Components/Header";
import Sidebar from "../../../Components/Sidebar";

const Reunionpage = () => {
  return (
    
      <div className="containerdem">
        <Sidebar />
        <div className="contentdem">
          <Header />
          <LasrYearsMeetings/>
        </div>
       
    </div>

  );
};

export default Reunionpage;
