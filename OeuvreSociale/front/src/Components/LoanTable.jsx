import '../Styles/loanTable.css';
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { MdOutlineModeEditOutline } from "react-icons/md";

const loans = [
  {
    loanId: 1,
    name: 'Mohammed',
    date: new Date(2024, 2, 20),
    status: 'Accepted',
  },
];
function Loans() {
    const [error, setError] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [filterStatus, setFilterStatus] = useState(null);
    const[laon,setLaon]=useState([]);
    useEffect(() => {
      const fetchRequests = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/LaonRequest`, { responseType: 'json', responseEncoding: 'utf8' });
          setLaon(response.data); 
          console.log("response:",response)
        } catch (error) {
          console.error('Error fetching requests:', error);
          setError(error);
          setLaon([]);
        }
      };
  
      fetchRequests();
    },[searchValue]); // Fetch employees whenever searchValue changes
  
  console.log("data laon :",laon);
    



  const filteredLoans = filterStatus
    ? laon.filter((loane) => loane.state === filterStatus)
    : laon;

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
              {/* <td className="lastcolumn">

                <Link to={`/tables${....}`}> <MdOutlineModeEditOutline /></Link>
                
                </td> */}
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