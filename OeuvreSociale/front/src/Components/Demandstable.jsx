import '../Styles/Demandstable.css';
import React, { useState } from 'react';
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
          {filteredDemands.map((demand) => (
            <tr key={demand.demandId}>
              <td>{demand.demandId}</td>
              <td>{demand.Employee}</td>
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
