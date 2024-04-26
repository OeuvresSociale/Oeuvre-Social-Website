import '../Styles/Demandstable.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios'


const RequestTable = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/Requests`, { responseType: 'json', responseEncoding: 'utf8' });
        setRequests(response.data); // Assuming response.data is an array of employee objects
      } catch (error) {
        console.error('Error fetching requests:', error);
        setError(error);
        setRequests([]);
      }
    };

    fetchRequests();
  }, [searchValue]); // Fetch employees whenever searchValue changes

  // Function to fetch details of a single employee
  const fetchRequestDetails = async (_id) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/Request/${_id}`);
      setSelectedRequest(response.data); // Assuming data is an object containing details of the selected employee
    } catch (error) {
      console.error('Error fetching request details:', error);
    }
  };

  // Render the table and other UI elements here
};



/////////////////////////////////////////////////////////////////////////
const demands = [
  {
    demandId: 1,
    Employee:"mohammed",
    type: 'Mariage',
    date: new Date(2024, 2, 20),
    status: 'Accepted',
  },
  {
    demandId: 2,
    type: 'Advance',
    Employee:"mohammed",
    date: new Date(2024, 2, 15),
    status: 'Refused',
  },
  {
    demandId: 3,
    Employee:"mohammed",
    type: 'Advance',
    date: new Date(2024, 2, 18),
    status: 'Pending',
  },
];

function Demands() {
  const [filterStatus, setFilterStatus] = useState(null);

  const filteredDemands = filterStatus
    ? demands.filter((demand) => demand.status === filterStatus)
    : demands;

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
          </tr>
        </thead>
        <tbody>
          {filteredDemands.map((request) => (
            <tr key={request._Id}>
              <td>{request._id}</td>
              <td>{request.employeeId}</td>
              <td>{request.requestTypeId}</td>
              <td>{request.creationDate.toLocaleDateString()}</td>
              <td  className={getStatusColor(request.state)}>{request.state}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
    </div>
  );
}

export default Demands;
