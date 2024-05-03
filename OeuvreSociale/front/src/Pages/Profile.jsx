import React from 'react';
import UserPro from '../Components/UserPro';
import Demands from '../Components/Demands';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

 
const Profile = () => {
  const [userData, setUserData] = useState([]);
  const [requests, setRequests] = useState({});
  const [error, setError] = useState(null);

  const {id}=useParams();
 console.log("id:",id)
  
  useEffect(() => {
   
    const fetchData1 =  async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/employees/${id}`, { responseType: 'json', responseEncoding: 'utf8' });
        console.log('Response:', response);
        setUserData(response.data); 
      } catch (error) {
        console.error('Error fetching requests:', error);
        setError(error);
        setUserData([]);
       
      }
    };
   
     fetchData1();
    }, [id]);

    // useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //       const [userDataResponse, requestsResponse] = await Promise.all([
           
    //         axios.get(`http://localhost:8000/api/employees/${id}`, { responseType: 'json', responseEncoding: 'utf8' }),
    //         axios.get(`http://localhost:8000/api/MyRequests/${id}`, { responseType: 'json', responseEncoding: 'utf8' })
    //       ]);
    
    //       setUserData(userDataResponse.data);
    //       setRequests(requestsResponse.data);
    //       console.log("userDataResponse.data:",userDataResponse.data)
    //       console.log("requestsResponse.data:",requestsResponse.data)
    //     } catch (error) {
    //       console.error('Error fetching data:', error);
    //       // Handle errors for each individual request
    //       if (error.response) {
    //         // Request made and server responded with an error status
    //         console.error('Response data:', error.response.data);
    //         console.error('Response status:', error.response.status);
    //         console.error('Response headers:', error.response.headers);
    //       } else if (error.request) {
    //         // The request was made but no response was received
    //         console.error('No response received:', error.request);
    //       } else {
    //         // Something happened in setting up the request that triggered an error
    //         console.error('Error setting up request:', error.message);
    //       }
    //       // Update state accordingly
    //       setError(error);
    //       setUserData([]);
    //       setRequests([]);
    //     }
    //   };
    
    //   fetchData();
    // }, [id]);
    
    //   const fetchData2 = async () => {
    //     try {
    //       const response = await axios.get(`http://localhost:8000/api/MyRequests/${id}`, { responseType: 'json', responseEncoding: 'utf8' });
    //       console.log('Response:', response);
    //       setRequests(response.data); 
    //     } catch (error) {
    //       console.error('Error fetching requests:', error);
    //       setError(error);
    //       setRequests([]);
    //     } 
    //   };
    //   fetchData2();
    // }, [id]);
    
console.log("profile requests",requests)
console.log("profile data",userData)
  return (
    <div>
  <div className='containerf'>
      <Sidebar/>
    <div className='contentf'>
        <Header/>
    <div className='content'>
    <UserPro dataP={userData} />
       
       {/* <Demands dataD={requests}/> */}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Profile;
