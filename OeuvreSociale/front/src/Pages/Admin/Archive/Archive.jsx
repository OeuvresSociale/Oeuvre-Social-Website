import React from "react";
import Arch from '../../../Components/Arch';


import Header from "../../../Components/Header";
import Sidebar from "../../../Components/Sidebar";

const Archive = () => {
  return (
    <div>
      <div className="containerf">
        <Sidebar />
        <div className="contentf">
          <Header />
        </div>
        </div>
       <div className="containerf">
        <Arch />
    </div>
    </div>

  );
};

export default Archive;
