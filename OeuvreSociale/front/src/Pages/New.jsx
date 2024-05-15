import "../Styles/new.css";
import React, { useState, useEffect } from 'react';
import axios from "axios";
const Login = (email) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      try{  
        // const email="17janvier2004@gmail.com"
        const response = await axios.put(`http://localhost:8000/api/resetPassword/${email}`, {
         password: password
       });
         console.log(response.data);
       }
       catch(error){
        setError(error.response.data);
      }
     };
    }
  

  return (
    <div className="newwrap">
      <div className="nwrapper">
        <div className="blue--section">
          <img src="./assets/logo.png" alt="logo" className="logo" />
        </div>
        <form onSubmit={handleSubmit}>
          <h1>Enter new password</h1>
          <div className="input-box">
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
              id="password"
              name="password"
              required
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              placeholder="Confirm password"
              id="confirmPassword"
              name="confirmPassword"
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="button" onClick={handleSubmit}>Continue</button>
          </form>
      </div>
    </div>
  );
};

export default Login;
