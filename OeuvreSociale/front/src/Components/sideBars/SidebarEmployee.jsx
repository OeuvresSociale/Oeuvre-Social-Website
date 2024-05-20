import React, { useState } from "react";
import { FaRegListAlt } from "react-icons/fa";
import { FaUsers, FaMoneyBillTrendUp } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { GrAnnounce } from "react-icons/gr";
import "../Styles/Sidebar.css";
import {
  MdOutlineSpaceDashboard,
  MdOutlineArchive,
  MdOutlineDashboard,
} from "react-icons/md";
import {
  TfiAnnouncement,
  TfiWrite,
  TfiAngleRight,
  TfiAngleLeft,
  TfiAngleDown,
} from "react-icons/tfi";
import { FaRegPlusSquare } from "react-icons/fa";
import { LuLayoutList } from "react-icons/lu";
import { HiOutlineSwitchVertical } from "react-icons/hi";
import { IoListCircleOutline } from "react-icons/io5";
import { HiBars4 } from "react-icons/hi2";
import MenuitemEmploye from "../MenuitemEmploye.jsx";

let stt = true;

function Sidebar({ children }) {
  const root = document.documentElement;
  const [isOpen, setIsOpen] = useState(stt);

  // Get the root element

  const toggle = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      root.style.setProperty("--dynamic-margin-left", "6%");
      root.style.setProperty("--dynamic-width", "94%");
      root.style.setProperty("--conwidth", "94%");
      root.style.setProperty("--dtwidth", "90%");
    } else {
      root.style.setProperty("--dynamic-margin-left", "18%");
      root.style.setProperty("--dynamic-width", "82%");
      root.style.setProperty("--conwidth", "82%");
      root.style.setProperty("--dtwidth", "79%");
    }
  };

  stt = isOpen; //memorize the state of the sidebar

  const menuItems = [
    {
      name: "Employé",
    },

    {
      path: "/FormularTab",
      name: "Mes demandes",
      icon: <FaRegListAlt />,
    },
    {
      path: "/offresvalides",
      name: "Offres",
      icon: <GrAnnounce />,
    },
    {
      path: "/home",
      name: "Contact",
      icon: <FaUsers />,
    },
  ];

  return (
    <div className={isOpen ? "sidemenu" : "inactive"}>
      <div className="top-section">
        <div className={isOpen ? "toggle-menu-btn" : "toggle-menu-btn2"}>
          {isOpen ? (
            <HiBars4 onClick={toggle} />
          ) : (
            <HiBars4 className="vertical" onClick={toggle} />
          )}
        </div>
      </div>
      <div className="mainmenu">
        <ul>
          {menuItems.map((menuItem, index) => (
            <MenuitemEmploye
              key={index}
              name={menuItem.name}
              path={menuItem.path}
              icon={menuItem.icon}
              subicon={menuItem.subicon}
              subicon2={menuItem.subicon2}
              subMenus={menuItem.subMenus || []}
            />
          ))}
        </ul>
      </div>
      <main>{children}</main>
    </div>
  );
}

export default Sidebar;
