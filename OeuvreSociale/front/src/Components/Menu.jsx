import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Styles/menu.css';

const Menu = ({ components }) => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('');

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/tables')) {
      setActiveItem('demands');
    } else if (path.includes('/loan')) {
      setActiveItem('loan');
    }
  }, [location.pathname]);

 

  const handleClick = (item) => {
    setActiveItem(item);
  };

  const ActiveComponent = components[activeItem];

  return (
    <div >
      <div className="menu">
        <Link
          to="/tables"
          className={`menu-item ${activeItem === 'demands' ? 'active' : ''}`}
          onClick={() => handleClick('demands')}
        >
          Demands
        </Link>
        <Link
          to="/tables"
          className={`menu-item ${activeItem === 'loan' ? 'active' : ''}`}
          onClick={() => handleClick('loan')}
        >
          Loan
        </Link>
      </div>
      <div className="componentContainer">
        {ActiveComponent ? <ActiveComponent /> : <div>Component not found</div>}
      </div>
    </div>
  );
};

export default Menu;
