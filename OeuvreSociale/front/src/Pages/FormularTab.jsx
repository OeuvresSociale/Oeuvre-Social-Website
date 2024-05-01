import React from 'react';
import Form from '../Components/Form';
import ListForms from '../Components/ListForms';
import Header from '../Components/Header';
const FormularTab = () => {
    return (
     
        <div className='contentdem'>
          <div>
          <Header/>
          </div>
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