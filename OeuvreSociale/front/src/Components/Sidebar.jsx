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
import MenuItem from "./MenuItem.jsx";

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

  stt = isOpen;//memorize the state of the sidebar

  const menuItems = [
    {
     
      name: "Adminisration",
      
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <MdOutlineSpaceDashboard />,
    },
    {
      path: "/reunions",
      name: "Réunions",
      icon: <MdOutlineArchive />,
    },
    {
      path: "/employeelist",
      name: "Employé",
      icon: <FaUsers />,
    },
    {
      path: "/tables",
      name: "Demandes",
      icon: <FaRegListAlt />,
    },
     {
      path: "/Offres",
      name: "Offres",
      icon: <GrAnnounce />,
    },
    {
      path: "/formulaire",
      name: "Paramétrage",
      icon: <FaRegPlusSquare />,
    },
    {
      name: "Trésorerie",
      icon: <FaMoneyBillTrendUp />,
      subicon: <TfiAngleDown />,
      subicon2: <TfiAngleRight />,
      subMenus: [
       
        {
          path: "/transaction",
          name: "Transaction",
          icon: <HiOutlineSwitchVertical />,
        },
        {
          path: "/demandevalid",
          name: "Demande valide",
          icon: <IoListCircleOutline />,
        },
      ],
    },
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
      name: "Annancement",
      icon: <GrAnnounce />,
    },
  ];

  return (
    <div className={isOpen ? "sidemenu" : "inactive"}>
      <div className="top-section">
        <div className={isOpen ? "toggle-menu-btn" : "toggle-menu-btn2"}>
          {isOpen ? (
           <HiBars4  onClick={toggle}/>
          ) : (
            <HiBars4 className="vertical" onClick={toggle}/>
          )}
        </div>
      </div>
      <div className="mainmenu">
        <ul>
          {menuItems.map((menuItem, index) => (
            <MenuItem
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
