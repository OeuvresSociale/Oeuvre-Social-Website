import React from 'react';
import Form from '../Components/Form';
import ListForms from '../Components/ListForms';
import HeaderUser from '../Components/HeaderUser';
const FormularTab = () => {
    return (
     
        <div>
          <HeaderUser/>
        <div className="Demand-section">
       <Form/>
        </div>
        <div className="Forms-section">
       <ListForms/>
        </div>
     </div>
);
    };
    
    export default  FormularTab;