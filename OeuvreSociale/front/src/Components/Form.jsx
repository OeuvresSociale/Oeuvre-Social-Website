import '../Styles/form.css';
import React, { useState, useEffect } from 'react';

// const demands = [
//   {
//     demandId: 1,
//     type: 'Mariage',
//     date: new Date(2024, 2, 20),
//     status: 'Pending',
//   },
 
 
// ];

function Demands() {
  const [filterStatus, setFilterStatus] = useState(null);
  const [demands, setDemands] = useState([]);
// const demands = [
//   {
//     demandId: 1,
//     type: 'Mariage',
//     date: new Date(2024, 2, 20),
//     status: 'Pending',
//   },
 
 
// ];


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
  return (
    <div className="demand">
        <div className="demwrapper">
        <h1 className="demands-title"> La liste de mes demandes </h1>
        <table className='table'>
        <thead>
          <tr>
            <th>N</th>
            <th>Type</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredDemands.map((demand) => (
          <tr>

              <td>{demand.demandId}</td>
              <td>{demand.type}</td>
              <td>{demand.date.toLocaleDateString()}</td>
              <td  className={getStatusColor(demand.status)}>{demand.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
    </div>
  );
}

export default Demands;
