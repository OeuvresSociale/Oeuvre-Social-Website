import React from "react";
import SideMenu from "./Components/Admin/bar_menu/SideMenu.jsx";
import TopMenu from "./Components/Admin/bar_menu/TopMenu.jsx";
import "./Styles/Admin/global/Admin_pages.css";


const AdminLayout = ({ children }) => {
  return (
    <div className="admin-container">
      <SideMenu />
      <div className="admin-content">
        <TopMenu />
        {children}
      </div> 
    </div>
  );
};
export default AdminLayout;
