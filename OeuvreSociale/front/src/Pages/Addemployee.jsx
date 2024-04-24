import React from 'react';
import'./Addemployee.css';

 import Formulaire from '../Components/Formulaire';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';

const Addemployee = () => {
  return (
    <div>
     <div className="containerf">
      <Sidebar />
      <div className="contentf">
        <Header  />
       <Formulaire className='forme'/>
      </div>
    </div>
 </div> );
};

export default Addemployee ;