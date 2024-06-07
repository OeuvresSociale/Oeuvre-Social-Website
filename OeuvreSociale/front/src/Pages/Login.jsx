import "../Styles/login.css";
import images from "../Assets/images.png";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/login", formData);
      console.log('email',formData.email,);
      console.log('password',formData.password,);
      const data = response.data;
      console.log("data:",data);
      setAlert({ type: 'success', message: response.data.msg }); // Set success alert message
      // After a successful login
      localStorage.setItem('userRole', data.role);
      localStorage.setItem('userId', data.id);
      localStorage.setItem('userSalary', data.salary);
      localStorage.setItem('userEmail', data.useremail);
      console.log("role:",data.role);
////////////////////////////////////

    } catch (error) {
      console.error("Error in login:", error);
      setAlert({ type: 'error', message: error.response?.data?.error || 'Login failed' }); // Set error alert message
    }
    }
  

  return (
    <div className="loginwrap">
      <div className="wrapper">
        <div className="blue-section">
          <img src={images} alt="logo" className="logo" />
        </div>
        <form onSubmit={handleSubmit}>
          <h1>Belink</h1>
          <div className="input-box">
            <input
              type="email"
              onChange={handleInputChange}
              value={formData.email}
              placeholder="Username"
              id="email"
              name="email"
              required
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              onChange={handleInputChange}
              value={formData.password}
              placeholder="Password"
              id="password"
              name="password"
            />
          </div>
          <div className="forget-pass">
            <a href="/Recover"> Forgot password? </a>
          </div>
          <button type="submit">Login</button>
          {alert && <div className={`alert ${alert.type}`}>{alert.message}</div>} {/* Display alert message */}
        </form>
      </div>
    </div>
  );
};

export default Login;
