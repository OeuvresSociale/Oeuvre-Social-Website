import react , { useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { BsSearch } from "react-icons/bs";
import "../Styles/Header.css";
import { Link, useLocation } from "react-router-dom";
import OIP from "../Assets/OIP.png";
import Logo from "../Assets/Logo1.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBell, FaUserCircle, FaSignOutAlt } from "react-icons/fa";

import axios from 'axios';

const Header = () => {
  const [searchValue, setSearchValue] = useState('');

  

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    // Do something with the searchValue, for example, you can log it
    setSearchValue( searchValue);
  };

  
  const [notificationMessage, setNotificationMessage] = useState("");

  const notify = async () => {
    try {
      // Make a POST request to your backend API endpoint
      const response = await axios.post('/api/send-notification', {
        message: "Your notification message here" // You can pass any data you want to send to the backend
      });

      // Handle the response if needed
      console.log(response.data); // Assuming your backend returns a response
      // Display a success toast if the notification is sent successfully
      toast.success('Notification sent successfully');
    } catch (error) {
      // Display an error toast if there's an error sending the notification
      toast.error('Failed to send notification');
      console.error('Error sending notification:', error);
    }
  };
  

  return (
    <div className="container">
      <div className="box1">
       
        <img src={Logo} alt="logo" className="logo5" />
        <div className="search">
        <BsSearch onClick={handleSearch} />
          <input
            id="searchInput"
            className="inp"
            type="text"
            placeholder="Rechercher..."
            pattern=''
            value={searchValue}
         onChange={handleChange}
          />
           
        </div>
        
       
      </div>
      
      <div className="header-right">
        <button className="icon-button">
          <FaBell className="icon" onClick={notify}  />
        </button>
       <Link to="/profile/:id"> <button className="icon-button">
          <FaUserCircle className="icon" />
        </button></Link>
        <button className="icon-button">
          <FaSignOutAlt className="icon" />
        </button>
      </div>

      <ToastContainer />
   
    </div>
  );
};

export default Header;
