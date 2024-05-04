import '../Styles/demands.css';
import React, { useState , useEffect } from 'react';
import axios from 'axios';

import { Link ,useParams} from 'react-router-dom';


// table des demnade d'un employee en his profile

  function Demands(props) {
    const [filterStatus, setFilterStatus] = useState(null); 
    const [requests, setRequests] = useState([]);
    //   const [error, setError] = useState(null);
    console.log("props:",props.dataD)
    useEffect(() => {
        setRequests(props.dataD); // Set requests when props.dataD changes
    }, [props.dataD]); // Trigger effect when props.dataD changes
    console.log("requests",requests);


  const filteredDemands = filterStatus
    ? requests.filter((demand) => demand.state === filterStatus)
    : requests;


  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };
  function getStatusColor(state) {
    switch (state) {
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
  const LoadingIndicator = () => {
    return (
      <div className="loading-spinner">
        {/* Insert loading spinner or message here */}
        Loading...
      </div>
    );
  };
  
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


         {requests.map((request) => (
          <tr key={request._id}>
              <td>1</td>
              <td>{request.requestTypeId.title}</td>
              <td>{request.creationDate}</td>
              <td  className={getStatusColor()}>{request.state}</td>

              <td>{request.motif}</td>
            </tr> 
                 ) )}  
               </tbody>
      </table>
      
    </div>
    </div>
  );
}

export default Demands;
