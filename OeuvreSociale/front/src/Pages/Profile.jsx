import React from 'react';
import UserPro from '../Components/UserPro';
import Demands from '../Components/Demands';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';

const Profile = () => {
  return (
    <div>
  <div className='containerf'>
      <Sidebar/>
    <div className='contentf'>
        <Header/>
    <div className='content'>
        <UserPro />
        <Demands />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Profile;
