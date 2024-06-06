import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Styles/menu.css';

const Menu = ({ components }) => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('');
  const path = location.pathname;

  useEffect(() => {
      setActiveItem('demands');
   
  }, [location.pathname]);

 

  const handleClick = (item) => {
    setActiveItem(item);
  };

  const ActiveComponent = components[activeItem];

  return (
    <div >
      <div className="menu">
        <Link
          to={path}
          className={`menu-item ${activeItem === 'demands' ? 'active' : ''}`}
          onClick={() => handleClick('demands')}
        >
          Demands
        </Link>
        <Link
          to={path}
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
