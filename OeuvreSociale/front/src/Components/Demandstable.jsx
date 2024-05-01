import '../Styles/Demandstable.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { MdOutlineModeEditOutline } from "react-icons/md";
import Demandetypes from './Demandetypes';
import { BsSearch } from "react-icons/bs";
import {Link} from 'react-router-dom';
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
        console.log("response:",response)
      } catch (error) {
        console.error('Error fetching requests:', error);
        setError(error);
        setRequests([]);
      }
    };

    fetchRequests();
  },[searchValue]); // Fetch employees whenever searchValue changes

console.log("data :",requests);

  const [filterStatus, setFilterStatus] = useState(null);

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
/////////////////////////////////////////////////////////////////////////  
const handleChange = (event) => {
  setSearchValue(event.target.value);
}; 

const handleSearch = () => {
  // Do something with the searchValue, for example, you can log it
  setSearchValue( searchValue);
};
return (
    <div className='dtwrapper'>
  <div className="subbox">
           <div className="search">
            <input 
            id="searchInput"
            className="inp" 
            type="text" 
            placeholder="id , employe nom , type..." 
            pattern=''
            value={searchValue}
            onChange={handleChange}
             />
              <BsSearch onClick={handleSearch} />
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

            <tr key={request._id} >

              <td>1</td>
              <td>{`${request.employeeId.familyName} ${request.employeeId.firstName}`}</td>
              <td>{request.requestTypeId.title}</td>
              <td>{request.creationDate}</td>
              <td  className={getStatusColor(request.state)}>{request.state}</td>
              <td className="lastcolumn">

                <Link to={`/tables/demandetype/${request._id}`}  > <MdOutlineModeEditOutline /></Link>
                
                </td>

            </tr>
          ))} 
        </tbody>
      </table>
      
    </div>


    </div>
    
  );
}

export default Demands;
