import React,{useEffect, useState} from "react"
import { FaCamera, FaPen, FaSignOutAlt } from 'react-icons/fa';
import { MdTransform } from "react-icons/md";
import Button from '@mui/material/Button'; 
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import OIP from "../Assets/OIP.png";
import '../Styles/adminpro.css';

const AdminProfileModal = () => {
  const [showModal, setShowModal] = useState(true);
  const [profileImage, setProfileImage] = useState(OIP);

  const user = {
    firstName: "Mohammed",
    familyName: "Moh"
  };

  const handleProfileImageUpload = (event) => {
    const file = event.target.files[0]; 
    if (file && file.type.includes('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    //logout action
  };

  return (
    <>
      {showModal && (
        <div className="moodal">
          <div className="moodal-content">
              <div className="profile-pic">
                <img src={profileImage} alt="Profile" />
                <label htmlFor="profileImageinput" className="camera-icon">
                  <FaCamera />
                  <input
                    id="profileImageinput"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleProfileImageUpload}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
              <div className="user-info">
                <p>{user.firstName} {user.familyName}</p>
              </div>
              <div className='boox'>
              <Box
      sx={{
        display: 'flex',
        flexDirection: 'column', 
        alignItems: 'left', 
        gap: '1px', 
        '& button': {
          width: '100%',
          padding: '2px', 
          textAlign:'left',
          '& svg': {
            marginRight: '10px',
          },
        },
      }}
    >
      <Button key=" Pass"> <MdTransform /><span> Pass to mode employee </span></Button>
      <Button key="Change "> <FaPen /><span>Change Password </span></Button>
      <Button key="Logout"><FaSignOutAlt /> <span> Logout </span> </Button>
    </Box>
  </div>
    </div>
      </div>
      )}
    </>
  );
};

export default AdminProfileModal;
