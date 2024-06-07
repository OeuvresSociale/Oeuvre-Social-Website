import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../Styles/adminpro.css";

const AdminProfileModal = () => {
 

  const [notifications, setNotifications] = useState([]);
 
  
  const id = localStorage.getItem('userId');
console.log("User ID:", id);

useEffect(() => {
  const fetchNotifications = async () => {
    if (!id) return; // Exit if id is not available

    try {
      const response = await axios.post("http://localhost:8000/api/getNotification", { employeeId: id });
      setNotifications(response.data);

      console.log("getNotification:", response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  fetchNotifications();
}, [id]); // Add id to the dependency array


  return (
  
     
        <div  className="moodal" >
          <div className="moodal-content">
          {notifications.map((notification, index) => (
          <div key={index} className="notif">
             <div>{notification.title}</div>
           <div>{notification.message}</div> 
            <div className="notifh">{new Date(notification.creationDate).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }
                    )}</div>
          </div>
        ))}

          </div>
          
        </div>
     
   
  );
};

export default AdminProfileModal;
