import '../Styles/loanTable.css';
import React, { useState } from 'react';
const loans = [
  {
    loanId: 1,
    name: 'Mohammed',
    date: new Date(2024, 2, 20),
    status: 'Accepted',
  },
];
function Loans() {
  const [filterStatus, setFilterStatus] = useState(null);
  const filteredLoans = filterStatus
    ? loans.filter((loan) => loan.status === filterStatus)
    : loans;

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
    <div className="loan">
        <div className="subox">
           <div className="search">
            <input className="inp"  type="text" placeholder="rechercher..." />
        </div>
           <div className="filtercontainer">
           <select value={filterStatus} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="Accepted" className="green">Accepted</option>
            <option value="Refused" className="red">Refused</option>
            <option value="Pending" className="yellow">Pending</option>
        </select>
        </div>
      <div className='loans'>
      <table className='table'>
        <thead>
          <tr>
            <th>N </th>
            <th>Employee</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredLoans.map((loan) => (
            <tr key={loan.loanId}>
              <td>{loan.loanId}</td>
              <td>{loan.name}</td>
              <td>{loan.date.toLocaleDateString()}</td>
              <td  className={getStatusColor(loan.status)}>{loan.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
    </div>
  );
}

export default Loans;