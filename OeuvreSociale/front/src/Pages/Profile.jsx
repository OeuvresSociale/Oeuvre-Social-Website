import React, { useState, useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import UserPro from '../Components/UserPro';
import Demands from '../Components/Demands';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState([]); 
  const [requests, setRequests] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  y
  console.log("User ID:", id);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataResponse = await axios.get(`http://localhost:8000/api/employees/${id}`);
        
        // Check if userDataResponse is successful
        if (userDataResponse.status === 200) {
          setUserData(userDataResponse.data);
        } else {
          throw new Error('Failed to fetch user data');
        }
        
        const requestsResponse = await axios.get(`http://localhost:8000/api/MyRequests/${id}`);
        
        // Check if requestsResponse is successful
        if (requestsResponse.status === 200) {
          setRequests(requestsResponse.data);
        } else {
          throw new Error('Failed to fetch requests data');
        }
        
        // If both requests are successful, setLoading(false)
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
        setIsLoading(false);
      }
    } 
    fetchData();
  }, [id]);


  
  if (isLoading) {
    return (
      <div className="loading-spinner">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <div className='containerf'>
        <Sidebar />
        <div className='contentf'>
          <Header />  
          <div className='content'>
            <UserPro dataP={userData} />
            {Object.keys(requests).length > 0 ? (
              <Demands dataD={requests} />
            ) : (
              <p>No requests found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default Profile;

