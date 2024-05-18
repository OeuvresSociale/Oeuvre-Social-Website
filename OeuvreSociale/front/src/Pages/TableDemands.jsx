import React from 'react';
import Menu from '../Components/Menu';
import DemandRecever_Table from '../Components/tabeles/DemandRecever_Table.jsx';
import LoanRecever_Table from '../Components/tabeles/LoanRecever_Table.jsx';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import Page_Header from '../Components/Admin/bar_menu/Page_Header.jsx';
import '../Styles/Admin/global/structureDuPage.css';

const TableDemands = () => {
  return (
    <div>
      <div className="body_space">
        <Sidebar />
        <div className="dataContainer">
          <Header />
          <Page_Header title="Les Demande Recever" subtitle="les tables des demande et loan recever"/>
          <Menu components={{ demands: DemandRecever_Table, loan: LoanRecever_Table }} />
         
        </div>
      </div>
    </div>
  );
};

export default TableDemands;
