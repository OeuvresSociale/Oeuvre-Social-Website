import React from 'react';
import UserPro from '../Components/UserPro';
import Demands from '../Components/Demands';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';

const Profile = () => {
  return (
    <div className='containerdem'>
      <Sidebar/>
    <div className='contentdem'>
      <Header/>
    <div className="profile">
      <div className="Infos-section">
        <UserPro />
      </div>
      <div className="Demand-section">
        <Demands />
      </div>
    </div>
    </div></div>
  );
};

export default Profile;
