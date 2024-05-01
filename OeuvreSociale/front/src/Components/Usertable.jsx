import React, { useState, useEffect } from 'react';
import { IoPersonAddOutline } from "react-icons/io5";
import { GoTrash } from "react-icons/go";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { Link } from 'react-router-dom';
import '../Styles/Usertable.css';
import axios from 'axios';
import { BsSearch } from "react-icons/bs";
import Deleteuser from "./Deleteuser";
import Modefyuser from "./Modefyuser";

import {  TfiAngleRight , TfiAngleLeft} from "react-icons/tfi";


const Usertable = () => {
  const[openDelete,setOpenDelete]=useState(false);
  const[openModefy,setOpenModefy]=useState(false);
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const[currentPage,setCurrentPage]=useState('');
 
  const totalPages = 2; // Example total number of pages

    const renderPaginationButtons = () => {
        const buttons = [];
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <li key={i}>
                    <button
                        className={currentPage === i ? 'pagination-button active2' : 'pagination-button'}
                        onClick={() => setCurrentPage(i)}
                    >
                        {i}
                    </button>
                </li>
            );
        }
        return buttons;
    };





    const [searchValue, setSearchValue] = useState('');
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/employees?page=1&search=${searchValue}`, { responseType: 'json', responseEncoding: 'utf8' });
        setEmployees(response.data); // Assuming response.data is an array of employee objects
      } catch (error) {
        console.error('Error fetching employees:', error);
        setError(error);
        setEmployees([]);
      }
    };

    fetchEmployees();
    
  }, [searchValue]); // Fetch employees whenever searchValue changes

 
// Function to fetch details of a single employee
const fetchEmployeeDetails = async (employeeId) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/employees/${employeeId}`
   // , { responseType: 'json', responseEncoding: 'utf8' }
    );
    setSelectedEmployee(response.data); // Assuming data is an object containing details of the selected employee
  } catch (error) {
    console.error('Error fetching employee details:', error);
  }
}

console.log("data :",employees);

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    // Do something with the searchValue, for example, you can log it
    setSearchValue( searchValue);
  };

  return (
    <div className="box">
      <div className="subbox">
        <div className="search">
          <input
            id="searchInput"
            className="inp"
            type="text"
            placeholder="id , employe nom , role"
            pattern=''
            value={searchValue}
         onChange={handleChange}
          />
            <BsSearch onClick={handleSearch} />
        </div>
        
           <Link  to="/employeelist/Addemployee"  >
              <button className="btn">
              Ajouter employé <IoPersonAddOutline />
            </button>
            </Link>
           </div>


           <div className="tableu">
           <table>
      <thead >
        <tr>
          <th>ID</th>
          <th>Nom de l'employé</th>
          <th>Email</th>
          <th>Salaire</th>
          <th>Rôle</th>
          <th></th>
          <th></th> 
        </tr>
      </thead>
      <tbody>
       
         

      {employees.map(employee => (
            <tr key={employee._id}>
              <td>{employee.idEmployee}</td>
              <td>{`${employee.familyName} ${employee.firstName}`}</td>
              <td>{employee.email}</td>
              <td>{employee.monthlySalary}</td>
              <td>{employee.role}</td>
              <td className="lastcolumn">
                <GoTrash 
                onClick={ async() => {setOpenDelete(true); await fetchEmployeeDetails(employee._id);}
                } />
                <MdOutlineModeEditOutline onClick={async() =>  {setOpenModefy(true); await fetchEmployeeDetails(employee._id);}} />
                <Link to={`/profile/${employee._id}`}  > <MdOutlineModeEditOutline /></Link>
              </td>
            </tr>
       ))} 
      </tbody>
    </table>






           </div>
           {console.log(selectedEmployee)}
           {openModefy && selectedEmployee && <Modefyuser closeModefy={setOpenModefy} selectedEmployee={selectedEmployee} />}
      

           {openDelete && selectedEmployee && <Deleteuser  closeDelete={setOpenDelete} selectedEmployee={selectedEmployee} />}


           <div className="pagination-container2">
            {/* Other JSX content */}
            <ul className="pagination">
                <li>
                    <button
                        className="pagination-button1"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <TfiAngleLeft />
                    </button>
                </li>
                {renderPaginationButtons()}
                <li>
                    <button
                        className="pagination-button1"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                      
                       <TfiAngleRight/>
                    </button>
                </li>
            </ul>
        </div>
          

      </div>


        );
      };
    
    export default Usertable ;
      
