import React, { useState, useEffect } from 'react';
import '../Styles/menu.css';

const Menu = () => {
  const [activeItem, setActiveItem] = useState(''); 
  const handleClick = (item) => {
    setActiveItem(item); 
  };

  return (
    <div className="header">
      <div className="menu">
        <a
          className={`menu-item ${activeItem === 'demands' ? 'active' : ''}`}
          href="./tables"
          onClick={() => handleClick('demands')} // Update active item on click
        >
          Demands
        </a>
        <a
          className={`menu-item ${activeItem === 'offres' ? 'active' : ''}`}
          href="/offres"
          onClick={() => handleClick('offres')}
        >
          Offres
        </a>
        <a
          className={`menu-item ${activeItem === 'loan' ? 'active' : ''}`}
          href="./loan"
          onClick={() => handleClick('loan')}
        >
          Loan
        </a>
      </div>
    </div>
  );
};

export default Menu;
