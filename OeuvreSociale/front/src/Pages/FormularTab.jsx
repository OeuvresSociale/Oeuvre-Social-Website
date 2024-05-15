import React from 'react';
import SidebarEmploye from '../Components/SidebarEmployee';
import Form from '../Components/Form';
import ListForms from '../Components/ListForms';
import Header from '../Components/Header';
const FormularTab = () => {
    return (

      <div className="containerdem"  style={{ backgroundColor: '#EAEDEF' }}>
      <SidebarEmploye />
      <div className="contentdem">
        <Header className="header" />
        <ListForms/>
      </div>
  
 </div>
     
       
);
    };
    
    export default  FormularTab;