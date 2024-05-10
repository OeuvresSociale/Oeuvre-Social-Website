import React, { useState, useEffect } from 'react';
import '../Styles/menu.css';
import { Link } from 'react-router-dom';


const Menu = () => {
  const [activeItem, setActiveItem] = useState('');

  const handleClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="header">
      <div className="menu">
        <Link
          to="/tables"
          className={`menu-item ${activeItem === 'demands' ? 'active' : ''}`}
          onClick={() => handleClick('demands')} // Update active item on click
        >
          Demands
        </Link>
        <Link
          to="/offres"
          className={`menu-item ${activeItem === 'offres' ? 'active' : ''}`}
          onClick={() => handleClick('offres')}
        >
          Offres
        </Link>
        <Link
          to="/loan"
          className={`menu-item ${activeItem === 'loan' ? 'active' : ''}`}
          onClick={() => handleClick('loan')}
        >
          Loan
        </Link>
      </div>
    </div>
  );
};

export default Menu;
