import React from "react";
import Header from "../../../Components/Header";
import ContactSection from "../../../Components/Employee/Home/ContactSection";
import Sidebar from "../../../Components/Sidebar";
import "../../../Styles/Admin/global/structureDuPage.css";

function Home() {
  return (
    <div>
      <div className="body_space">
        <Sidebar />
        <div className="dataContainer">
          <Header />
          <div>
            <ContactSection />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
