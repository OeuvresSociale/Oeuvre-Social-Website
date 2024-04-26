import '../Styles/demands.css';
import '../Styles/demandsAdmin.css'
import React, { useState } from 'react';



const demands = [
  {
    demandId: 1,
    type: 'Mariage',
    date: new Date(2024, 2, 20),
    status: 'Accepted',
    motif: 'Needed for application',
  },
  {
    demandId: 2,
    type: 'Advance',
    date: new Date(2024, 2, 15),
    status: 'Refused',
    motif: 'Insufficient reason',
  },
  {
    demandId: 3,
    type: 'Advance',
    date: new Date(2024, 2, 18),
    status: 'Pending',
    motif: 'Waiting for approval',
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
  return (
    <div className="demand">
                <div className="search-bar">
        <input type="text" placeholder="Search..." />
            </div>
     <div className="demand-list">
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
          {filteredDemands.map((demand) => (
            <tr key={demand.demandId}>
              <td>{demand.demandId}</td>
              <td>{demand.type}</td>
              <td>{demand.date.toLocaleDateString()}</td>
              <td  className={getStatusColor(demand.status)}>{demand.status}</td>
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
