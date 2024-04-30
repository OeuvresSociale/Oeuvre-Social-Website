import '../Styles/userPro.css';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
function UserPro() {
  const [userData, setUserData] = useState({
    name: 'Dahoun Manel',
    firstName: 'Dahoun',
    lastName: 'Manel',
    situationFamiliale: 'Célibataire',
    email: 'm.dahoun@esi-sba.dz',
    phoneNumber: '0666666666',
    salary: 25000000,
    bankAccount: '12345678901234567890',
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');

const handlePasswordSubmit = () => {
  // Here you would check if the entered password is correct
  // For demonstration, let's assume the password is correct
  setShowPasswordModal(false);
  setShowOTPModal(true);
  
  // Proceed to the next step (OTP verification)
};
const [showOTPModal, setShowOTPModal] = useState(false);
const [otp, setOTP] = useState('');

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
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user-data');
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('Failed to fetch user data:', await response.text());
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="profile">
      <h1 className="profile-title">Employee Profile</h1>
      <hr className="profile-line" /> 
  <div className="userwrapper">
      <div className="profilepicture">
          <img src="OIP.png"/>
       </div>
              <div className="left">
            <p>First name:</p>
            <p>Last name:</p>
            <p>Email address:</p>
            <p>Bank account:</p>
          </div>
          <div className="Info-left">
            <p>{userData.firstName}</p>
            <p>{userData.lastName}</p>
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
            <p>{userData.situationFamiliale}</p>
            <p>{userData.salary}</p>
          </div>
        </div>
        <button className="button" onClick={() => setShowPasswordModal(true)}>
      Change Password <FontAwesomeIcon icon={faPen} size="sm" />
    </button>
    {showPasswordModal && (
      <div className="modal">
        <h2>Enter Your Password</h2>
        <input
          type="password"
          value={password}
          placeholder='tap your password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => setShowPasswordModal(false)}>Cancel</button>
        <button className="Enter" onClick= {handlePasswordSubmit}>Enter </button>
      </div>
    )}
    {showOTPModal && (
      <div className='formtitlewrapper'>
  <div className="modal">
    <h2>Enter OTP Sent to Your Email</h2>
    <input
      type="text"
      value={otp}
      onChange={(e) => setOTP(e.target.value)}
    />
    <button onClick={handleOTPSubmit}>Validate</button>
    <button onClick={() => setShowOTPModal(false)}>Cancel</button>
  </div>
  </div>

)}
{showNewPasswordModal && (
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
    <button onClick={handleNewPasswordSubmit}>Validate</button>
    <button onClick={() => setShowNewPasswordModal(false)}>Cancel</button>
  </div>
)}
    </div>
  );
}

export default UserPro;
