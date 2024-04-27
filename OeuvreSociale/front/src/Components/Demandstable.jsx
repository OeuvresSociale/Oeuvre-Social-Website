import '../Styles/Demandstable.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { MdOutlineModeEditOutline } from "react-icons/md";
import Demandetypes from './Demandetypes';

// les tables de demandes partie admin
  


function Demands() {
  const[openModefy,setOpenModefy]=useState(false);
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {

        const response = await axios.get(`http://localhost:8000/api/Requests`, { responseType: 'json', responseEncoding: 'utf8' });
        setRequests(response.data); 

      } catch (error) {
        console.error('Error fetching requests:', error);
        setError(error);
        setRequests([]);
      }
    };

    fetchRequests();
  },[]); // Fetch employees whenever searchValue changes

console.log("data :",requests);

  // Function to fetch details of a single employee
  const fetchRequestDetails = async (_id) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/Request/${requests._id}`);
      setSelectedRequest(response.data); // Assuming data is an object containing details of the selected employee
    } catch (error) {
      console.error('Error fetching request details:', error);
    }
  };

  const [filterStatus, setFilterStatus] = useState(null);

  const filteredDemands = filterStatus
    ? requests.filter((demand) => demand.status === filterStatus)
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
/////////////////////////////////////////////////////////////////////////  
  return (
    <div className='dtwrapper'>
  <div className="subbox">
           <div className="search">
            <input className="inp"  type="text" placeholder="rechercher..." />
           
           </div>
        </div>
     
      <div className="filter">
           <select value={filterStatus} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="Accepted" className="green">Accepted</option>
            <option value="Refused" className="red">Refused</option>
            <option value="Pending" className="yellow">Pending</option>
        </select>
        </div>
 <div className="demands">
      <table className='tabl'>
        <thead>
          <tr>
            <th>N</th>
            <th>Employee</th>
            <th>Demande type</th>
            <th>Date</th>
            <th>Status</th>
            <th></th>
          </tr> 
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request._Id} >
              <td>1</td>
              <td>{`${request.employeeId.familyName} ${request.employeeId.firstName}`}</td>
              <td>{request.requestTypeId.title}</td>
              <td>{request.creationDate}</td>
              <td  className={getStatusColor(request.state)}>{request.state}</td>
              <td className="lastcolumn">
                <MdOutlineModeEditOutline onClick={async() =>  {setOpenModefy(true); await fetchRequestDetails(requests._id);}} />
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
    {openModefy && selectedRequest && <Demandetypes closeModefy={setOpenModefy} selectedRequest={selectedRequest} />}

    </div>
    
  );
}

export default Demands;
