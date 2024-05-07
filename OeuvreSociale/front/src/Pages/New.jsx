import "../Styles/new.css";
import React, { useState, useEffect } from 'react';

const Login = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      setError('');
      // Proceed with password change logic
      console.log('Password changed successfully');
    }
  };

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
