import React from "react";
import Meeting from '../Components/Meeting';
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

const Reunionpage = () => {
  return (
    <div>
      <div className="containerf">
        <Sidebar />
        <div className="contentf">
          <Header />
        </div>
        </div>
       <div className="containerf">
        <Meeting />
    </div>
    </div>

  );
};

export default Reunionpage;
