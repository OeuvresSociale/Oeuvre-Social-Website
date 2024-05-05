import React from 'react';
import Menu from '../Components/Menu';
import Demandstable from '../Components/Demandstable';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import '../Styles/Tabledemandes.css';
const TableDemands = () => {
    return ( 
      <div className='containerdem'>
        <Sidebar/>
        <div className='contentdem'>
          <Header/>
         <Menu />
        <div className="Demand-section">
       <Demandstable/>
        </div>
     </div></div>
);
    };
    
    export default  TableDemands;
    