import React from 'react';
import Adminpro from '../Components/Adminpro';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';

const ProfileAd = () => {
  return (
    <div>
  <div className='containerf'>
      <Sidebar/>
    <div className='contentf'>
        <Header/>
        </div>

    <div >
        <Adminpro />
      </div>
    </div>
     </div>
  );
};

export default  ProfileAd;
