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
  const [isOtpRequestOpen, setIsOtpRequestOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch user data (assuming an API call or data retrieval logic)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Replace with your API call or data fetching logic
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

  const handleRequestOtp = async () => {
    try {
      setErrorMessage(''); // Clear any previous error messages
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        body: JSON.stringify({ email: userData.email }),
      });
      if (response.ok) {
        setIsOtpRequestOpen(true);
      } else {
        setErrorMessage(await response.text());
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setErrorMessage(''); // Clear any previous error messages
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        body: JSON.stringify({ email: userData.email, otp }),
      });
      if (response.ok) {
        setIsOtpRequestOpen(false);
        setIsChangePasswordOpen(true);
        setOtp(''); // Clear OTP input after verification
      } else {
        setErrorMessage(await response.text());
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  const handleChangePassword = async () => {
    try {
      setErrorMessage(''); // Clear any previous error messages
      if (newPassword !== confirmPassword) {
        setErrorMessage('Passwords do not match');
        return;
      }

      const response = await fetch('/api/change-password', {
        method: 'POST',
        body: JSON.stringify({ email: userData.email, newPassword }),
      });
      if (response.ok) {
        setIsChangePasswordOpen(false);
        setNewPassword('');
        setConfirmPassword(''); // Clear password inputs after success
        setSuccessMessage('Password changed successfully');
      } else {
        setErrorMessage(await response.text());
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };
  return (
    <div className="profile">
        <h1 className="profile-title">Employee Profile</h1>
        <hr className="profile-line" /> 
        <div className="user-profile">
        <div className="profile-picture">
        <img src="https://placehold.it/150x150" alt="Profile avatar" />
        </div>
      <div className="profile-info">
        <p className="left"><div className='fir' >First name:</div><div className='var'>{userData.firstName}</div> </p>
        <p className="right"><div className='fir' >Phone number:</div> {userData.phoneNumber}</p>
        <p className="left"><div className='fir' >Last name:</div> {userData.lastName}</p>
        <p className="right"><div className='fir' > familiale:</div> {userData.situationFamiliale}</p>
        <p className="left"><div className='fir' >Email address: </div>{userData.email}</p>
        <p className="right"><div className='fir' >Salary:</div> {userData.salary}</p>
        <p className="left"><div className='fir' >Bank account: </div>{userData.bankAccount}</p>
        <button className="button">Change Password <FontAwesomeIcon icon={faPen} size="sm" /></button>
     </div>
 </div>
 </div>

  );
}


export default UserPro;


