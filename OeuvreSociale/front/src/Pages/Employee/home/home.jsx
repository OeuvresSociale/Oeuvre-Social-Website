import React from "react";
import Header from "../../../Components/Header";
import Sidebar from "../../../Components/Sidebar";

const home = () => {
  return (
    <div>
      <div className="containerf">
        <Sidebar />
        <div className="contentf">
          <Header />
          <div className="row">
            <div className="col-12">
              <h1>home</h1>
              <p className="fs-5 fw-light">
                Welcome to your home,{" "}
                <span className="fw-bold">user</span>!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default home;
