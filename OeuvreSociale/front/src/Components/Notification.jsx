import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../Styles/adminpro.css";

const AdminProfileModal = () => {
 

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Replace the URL with your actual endpoint
    axios.get("https://your-backend-endpoint.com/notifications")
      .then((response) => {
        // Assuming the response.data is an array of notifications
        setNotifications(response.data);
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      });
  }, []);

  return (
  
     
        <div  className="moodal" >
          <div className="moodal-content">
          {notifications.map((notification, index) => (
          <div key={index} className="notif">
            {notification.message}
            <div className="notifh">{notification.creationDate}</div>
          </div>
        ))}

          </div>
          
        </div>
     
   
  );
};

export default AdminProfileModal;
