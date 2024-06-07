
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
 // const [userData, setUserData] = useState([]);
const [showPasswordModal, setShowPasswordModal] = useState(false);
const [password, setPassword] = useState('');
const [email, setEmail] = useState('');
const [error, setError] = useState(null);

const [otp, setOTP] = useState([]);



const userData = props.dataP;
console.log("userData",userData);
console.log("id:",userData._id);

//generate new OTP
const handlePasswordSubmit =async (e) => {
  // Here you would check if the entered password is correct
 
    e.preventDefault();//not refreshing the page 
   try{  
    const response = await axios.get("http://localhost:8000/api/generateOTP",{ params: { email: userData.email } });
     setOTP(response.data)
     setShowPasswordModal(false);
    setShowOTPModal(true);
   }

   catch(error){setError(error.response.data);
   }
<<<<<<< HEAD
   console.log("OTP:",OTP);
=======
   console.log("otp:",otp);
>>>>>>> origin/Manel
   
   // Proceed to the next step (OTP verification)
 };

 
const [showOTPModal, setShowOTPModal] = useState(false);

const handleOTPInputChange = (e, index) => {
  const newOTP = [...OTP];
  newOTP[index] = e.target.value;
  setOTP(newOTP.join(''));
};
const handleOTPKeyDown = (e, index) => {
  if (e.key === 'Backspace' && index > 0 && !OTP[index]) {
    const newOTP = [...OTP];
    newOTP[index - 1] = '';
    setOTP(newOTP.join(''));
    const prevInput = document.getElementById(`OTPInput${index - 1}`);
    prevInput && prevInput.focus();
  } else if (e.key.length === 1 && index < 5) {
    const nextInput = document.getElementById(`OTPInput${index + 1}`);
    nextInput && nextInput.focus();
  }
};
const handleOTPFocus = (e, index) => {
  const OTPValue = e.target.value;
  if (OTPValue) {
    const newOTP = [...OTP];
    newOTP[index] = '';
    setOTP(newOTP.join(''));
  }
};

// verify OTP validation
const handleOTPSubmit =async (e) => {
  // Here you would check if the entered OTP is correct
  e.preventDefault();//not refreshing the page 
  try{  
  //  const response = await axios.get("http://localhost:8000/api/verifyOTP",{ params: { code: "422495" } });
    setShowOTPModal(false);
    setShowNewPasswordModal(true);
    // console.log ("resonse:",response.data);
  }
  catch(error){
  //  setError(error.response.data);
 } 
};

const [showNewPasswordModal, setShowNewPasswordModal] = useState(false);
const [newPassword, setNewPassword] = useState('');
const [confirmNewPassword, setConfirmNewPassword] = useState('');

// reset password
const handleNewPasswordSubmit = async(e) => {
  // Here you would handle the submission of the new password
  e.preventDefault();//not refreshing the page 
  try{  
   const response = await axios.put(`http://localhost:8000/api/resetPassword/${userData._id}`, {
    password: newPassword
  });
    // setOTP(response.data)
    console.log(response.data);
    setShowNewPasswordModal(false);
  }
  catch(error){
   setError(error.response.data);
 }
 console.log("email:",userData.email);
    console.log("password:",newPassword);
//   // Reset input values
  setPassword('');
  setOTP('');
  setNewPassword('');
  setConfirmNewPassword('');
};




   if (!userData) {
    return <div>Loading...</div>;

 }
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

{/*------------------------------------------------------------------------------------*/}

        <button className="button" onClick={() => setShowPasswordModal(true)}>
      Change Password <FontAwesomeIcon icon={faPen} size="sm" />
    </button>
{/*------------------------------------------------------------------------------------*/}

    {showPasswordModal && (
      <div className='formtitlewrapper'>
      <div className="modal">
        <h2>Enter Your Password</h2>
        <input
          type="password"
          value={password}
          placeholder='tap your password'
          onChange={(e) => setPassword(e.target.value)} />
          <h2>Enter Your email</h2>
        <input
          type="email"
          value={email}
          placeholder='tap your email'
          onChange={(e) => setEmail(e.target.value)} />
        <button className="canceel" onClick={() => setShowPasswordModal(false)}>Cancel</button>
        <button className="Enteer" onClick= {handlePasswordSubmit}>Enter </button>
      </div>
      </div>
    )}

{/*------------------------------------------------------------------------------------*/}

    {showOTPModal && (
  <div className='formtitlewrapper'>
    <div className="modal">
      <h3 className='OTPtitle'> Enter OTP Sent to Your Email</h3>
      <div className="OTPInputWrapper">
        {[...Array(6)].map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={OTP[index] || ''}
            onChange={(e) => handleOTPInputChange(e, index)}
            onKeyDown={(e) => handleOTPKeyDown(e, index)}
            onFocus={(e) => handleOTPFocus(e, index)}
            id={`OTPInput${index}`} // Unique identifier for each input
          />
        ))}
      </div>
      <button className="canceel" onClick={() => setShowOTPModal(false)}>Cancel</button>

      <button className='Enteer' >Confirm </button>  {/*onClick={handleSubmit} */}

    </div>
  </div>
)}

{/*------------------------------------------------------------------------------------*/}

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
