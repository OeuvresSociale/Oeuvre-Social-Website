import '../Styles/userPro.css';
import OIP from "../Assets/OIP.png"
import { FaCamera } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {useParams} from 'react-router-dom';

  
function UserPro(props) {
  const [profileImage, setProfileImage] = useState(OIP); 

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
///////////////////////////////////////////
useEffect(() => {
  const fetchProfileImage = async () => {
    try {
      // Assuming props.userId contains the user's ID
      const response = await axios.get(`http://localhost:8000/api/${props.userId}/uploadImage`);
      setProfileImage(response.data); // Assuming the response.data contains the image data
    } catch (error) {
      console.error('Error fetching profile image:', error);
    }
  };
  fetchProfileImage();
}, [props.userId]);

///////////////////////////////////////////
 // const [userData, setUserData] = useState([]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
const [password, setPassword] = useState('');
const [error, setError] = useState(null);

const handlePasswordSubmit = () => {
  // Here you would check if the entered password is correct
  // For demonstration, let's assume the password is correct
  setShowPasswordModal(false);
  setShowOTPModal(true);
  
  // Proceed to the next step (OTP verification)
};
const [showOTPModal, setShowOTPModal] = useState(false);
const [otp, setOTP] = useState('');

const handleOTPInputChange = (e, index) => {
  const newOTP = [...otp];
  newOTP[index] = e.target.value;
  setOTP(newOTP.join(''));
};

const handleOTPKeyDown = (e, index) => {
  if (e.key === 'Backspace' && index > 0 && !otp[index]) {
    const newOTP = [...otp];
    newOTP[index - 1] = '';
    setOTP(newOTP.join(''));
    const prevInput = document.getElementById(`otpInput${index - 1}`);
    prevInput && prevInput.focus();
  } else if (e.key.length === 1 && index < 5) {
    const nextInput = document.getElementById(`otpInput${index + 1}`);
    nextInput && nextInput.focus();
  }
};

const handleOTPFocus = (e, index) => {
  const otpValue = e.target.value;
  if (otpValue) {
    const newOTP = [...otp];
    newOTP[index] = '';
    setOTP(newOTP.join(''));
  }
};

const handleOTPSubmit = () => {
  // Here you would check if the entered OTP is correct
  // For demonstration, let's assume the OTP is correct
  setShowOTPModal(false);
  setShowNewPasswordModal(true);
  // Proceed to the next step (new password input)
};

const [showNewPasswordModal, setShowNewPasswordModal] = useState(false);
const [newPassword, setNewPassword] = useState('');
const [confirmNewPassword, setConfirmNewPassword] = useState('');

const handleNewPasswordSubmit = () => {
  // Here you would handle the submission of the new password
  // For demonstration, let's assume the new password is updated successfully
  setShowNewPasswordModal(false);
  // Reset input values
  setPassword('');
  setOTP('');
  setNewPassword('');
  setConfirmNewPassword('');
};

 const userData = props.dataP;
  console.log("userData",userData);
 
  return (
    <div className="profile">
      <h1 className="profile-title">Employee Profile</h1>
      <hr className="profile-line" /> 
  <div className="userwrapper">
  <div className="profilepicture">
          <img src={profileImage} alt="Profile" />
          <label htmlFor="profileImageInput" className="cameraIcon">
            <FaCamera />
            <input
              id="profileImageInput"
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={handleProfileImageUpload}
              style={{ display: 'none' }}
            />
          </label>
        </div>
              <div className="left">
            <p>First name:</p>
            <p>Last name:</p>
            <p>Email address:</p>
            <p>Bank account:</p>
          </div>
          <div className="Info-left">
            <p>{userData.familyName}</p>
            <p>{userData.firstName}</p>
            <p>{userData.email}</p>
            <p>{userData.bankAccount}</p>
          </div>
          <div className="right">
            <p>Phone number:</p>
            <p>Situation familiale:</p>
            <p>Salary:</p>
          </div>
          <div className="Info-right">
            <p>{userData.phoneNumber}</p>

            <p>{userData.familysitution}</p>
            <p>{userData.monthlySalary}</p>

          </div>
        </div>
        <button className="button" onClick={() => setShowPasswordModal(true)}>
      Change Password <FontAwesomeIcon icon={faPen} size="sm" />
    </button>
    {showPasswordModal && (
      <div className='formtitlewrapper'>
      <div className="modal">
        <h2>Enter Your Password</h2>
        <input
          type="password"
          value={password}
          placeholder='tap your password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="canceel" onClick={() => setShowPasswordModal(false)}>Cancel</button>
        <button className="Enteer" onClick= {handlePasswordSubmit}>Enter </button>
      </div>
      </div>
    )}
    {showOTPModal && (
  <div className='formtitlewrapper'>
    <div className="modal">
      <h3 className='otptitle'> Enter OTP Sent to Your Email</h3>
      <div className="otpInputWrapper">
        {[...Array(6)].map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={otp[index] || ''}
            onChange={(e) => handleOTPInputChange(e, index)}
            onKeyDown={(e) => handleOTPKeyDown(e, index)}
            onFocus={(e) => handleOTPFocus(e, index)}
            id={`otpInput${index}`} // Unique identifier for each input
          />
        ))}
      </div>
      <button className="canceel" onClick={() => setShowOTPModal(false)}>Cancel</button>
      <button className='Enteer' onClick={handleOTPSubmit}>Confirm </button>
    </div>
  </div>
)}
{showNewPasswordModal && (
  <div className='formtitlewrapper'>
  <div className="modal">
    <h2>Enter New Password</h2>
    <input
      type="password"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
      placeholder="New Password"
    />
    <input
      type="password"
      value={confirmNewPassword}
      onChange={(e) => setConfirmNewPassword(e.target.value)}
      placeholder="Confirm New Password"
    />
    <button className='can'  onClick={() => setShowNewPasswordModal(false)}>Cancel</button>
    <button className='entteer' onClick={handleNewPasswordSubmit}>Validate</button>
  </div>
  </div>
)}
    </div>
  );
}

export default UserPro;
