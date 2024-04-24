import React from 'react';
import '../Styles/menu.css';
const Menu = () => {
    return (
<div className="header">
  <div className="menu">
    <a className="menu-item active" href="/demands">Demands</a>
    <a className="menu-item" href="/offres">Offres</a>
    <a className="menu-item" href="/loan">Loan</a>
  </div>
</div>



        );
    };
    
    export default  Menu;
    