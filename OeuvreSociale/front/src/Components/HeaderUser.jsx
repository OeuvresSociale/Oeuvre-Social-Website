import React from "react";
import { Link } from "react-router-dom";
import "../Styles/headerUser.css";
import { FaBell, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import images from "../Assets/images.png";

const HeaderUser = () => {
  return (
    <header className="headeer" style={{ backgroundColor: "white" }}>
      <div className="header-left">
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={images} alt="Belink Logo" className="logo" />
          <span className="website-name">Belink</span>
        </div>
        <nav className="menu">
          <ul>
            <li>
              <Link to="/about-us">
                <span className="texte">About Us</span>
              </Link>
            </li>
            <li>
              <Link to="/offres">
                <span className="texte">Offres</span>
              </Link>
            </li>
            <li>
              <Link to="/tables">
                <span className="texte">Demands</span>
              </Link>
            </li>
            <li>
              <Link to="/contact-us">
                <span className="texte">Contact Us</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="header-right">
        <button className="icon-button">
          <FaBell className="icon" />
        </button>
        <button className="icon-button">
          <FaUserCircle className="icon" />
        </button>
        <button className="icon-button">
          <FaSignOutAlt className="icon" />
        </button>
      </div>
    </header>
  );
};

export default HeaderUser;
