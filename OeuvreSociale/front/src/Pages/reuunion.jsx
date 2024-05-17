import React from "react";
import Header from "../../../Components/Header";
import Sidebar from "../../../Components/Sidebar";

const reuunion = () => {
  return (
    <div>
      <div className="containerf">
        <Sidebar />
        <div className="contentf">
          <Header />
        </div>
        </div>
       <div className="containerf">
          <reunion />
    </div>
    </div>

  );
};

export default reuunion;
