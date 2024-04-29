import '../Styles/demands.css';
import React, { useState , useEffect } from 'react';
import axios from 'axios';

import { Link ,useParams} from 'react-router-dom';


// table des demnade d'nu employee en his profile

function Demands() {

  const [filterStatus, setFilterStatus] = useState(null); 
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);

  //const {id}=useParams();
 

  useEffect(() => {
    
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/MyRequests/`, { responseType: 'json', responseEncoding: 'utf8' });
        setRequests(response.data); 
      } catch (error) {
        console.error('Error fetching requests:', error);
        setError(error);
        setRequests([]);
      } 
    };

    fetchRequests(); 
   
   
  },[]); 

  console.log("requests",requests);

  const filteredDemands = filterStatus

    ? requests.filter((demand) => demand.state === filterStatus)
    : requests;

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };
  function getStatusColor(status) {
    switch (status) {
      case 'Accepted':
        return 'status-accepted'; 
      case 'Refused':
        return 'status-refused';
      case 'Pending':
        return 'status-pending'; 
      default:
        return ''; 
    }
  }
  return (
    <div className="demand">
        <h1 className="demands-title"> History </h1>
        <hr className="demands-line" /> 
        <div className="demwrapper">
           <div className="filter-container">
           <select value={filterStatus} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="Accepted" className="green">Accepted</option>
            <option value="Refused" className="red">Refused</option>
            <option value="Pending" className="yellow">Pending</option>
        </select>
        </div>

      <table className='table'>
        <thead>
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Date</th>
            <th>Status</th>
            <th>Motif</th>
          </tr>
        </thead>
        <tbody>

          {requests.map((demand) => (
          <tr key={demand._id}>

              <td>1</td>
              <td>{demand.requestTypeId.title}</td>
              <td>{demand.creationDate}</td>
              <td  className={getStatusColor(demand.state)}>{demand.state}</td>

              <td>{demand.motif}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
    </div>
  );
}

export default Demands;
