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

  // const { id } = useParams();

  const id = localStorage.getItem('userId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userDataResponse, requestsResponse] = await Promise.all([
          axios.get(`http://localhost:8000/api/employees/${id}`),
          axios.get(`http://localhost:8000/api/MyRequests/${id}`)
        ]);

        if (!requestsResponse || !requestsResponse.data) {
          throw new Error('Invalid response from the server');
        }
        setUserData(userDataResponse.data);
        setRequests(requestsResponse.data);
        console.log("data:", requestsResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
        setIsLoading(false);
      }
    };
    
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
   

  <div className='containeradd'>
      <Sidebar/>
    <div className='contentadd'>
        <Header/>
    
    <UserPro dataP={userData} />
       
       {/* <Demands dataD={requests}/> */}
       </div>

      
    </div>
  );
  
};

export default Profile;

