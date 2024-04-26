import React, { useState ,useEffect} from "react";
import { IoPersonAddOutline } from "react-icons/io5";
import { GoTrash } from "react-icons/go";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { Link } from 'react-router-dom';
import '../Styles/Formulaire.css';
import { BsSearch } from "react-icons/bs";
import Deleteuser from "./Deleteuser";
import Modefyuser from "./Modefyuser";
import {  TfiAngleRight , TfiAngleLeft} from "react-icons/tfi";
import axios from 'axios';

const Formulaire = () => {
  const[openDelete,setOpenDelete]=useState(false);
  const[openModefy,setOpenModefy]=useState(false);
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
 

  
  const [inputs, setInputs]=useState({
    idEmployee:"",
    familyName:"",
    firstName:"",
    email:"",
    phoneNumber: "" ,
    sexe:"",
    familysitution:"",
    numberOfChild:"",
    bankAccount:"",
    monthlySalary:"",
    dateStartJob:"",
    password:"",
    role:"",
    
    
  });
  //set erreur 
  const [err, setErr]=useState(null);
  // Effect to update inputs state when gender, role, or sitfam change
  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };

  const [selectedrole, setSelectedrole] = useState(''); 

  const handleroleChange = (e) => {
    setSelectedrole(e.target.value);
  };

  const [selectedsitfam, setSelectedsitfam] = useState(''); 

  const handlesitfamChange = (e) => {
    setSelectedsitfam(e.target.value);
  };
  const handleChange = (e) =>{
    setInputs((prev)=>({...prev,[e.target.name]:e.target.value}));
  };
  const [selectedGender, setSelectedGender] = useState(''); 

  
  /** */
    // Effect to update inputs state when gender, role, or sitfam change
useEffect(() => {
  setInputs(prevInputs => ({
    ...prevInputs,
    sexe: selectedGender,
    role: selectedrole,
    familysitution: selectedsitfam
  }));
}, [selectedGender, selectedrole, selectedsitfam]);


  const handleClick = async (e) => {
    
   e.preventDefault();//not refreshing the page 
  try{
   
    await axios.post("http://localhost:8000/api/register",inputs);
    
  }
  catch(error){
  setErr(error.response.data);
 
  
  }
  };
  
  //const errorMessage = error && error.error ? error.error : ""; 
//for  user table 

const [employees, setEmployees] = useState([]);
const [error, setError] = useState(null);
const [selectedEmployee, setSelectedEmployee] = useState(null);
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




const handleSearch = () => {
  // Do something with the searchValue, for example, you can log it
  setSearchValue( searchValue);
};

    return (
      <div className="boxf">
        <div className="subboxf">
           <div className="searchf">
            <input  className='inpf' type="text" placeholder="rechercher..." />
            <BsSearch />
           </div>
           
           </div>
<div className="formulaire">
<div className="f1">
 <div style={{ width: '50%' }} className="f2" ><input type="text" name="familyName" placeholder="Nom" onChange={handleChange} required/></div>
 <div style={{ width: '50%' }} className="f2"  ><input type="text"name="firstName" placeholder="Prénom" onChange={handleChange} required/></div>

 </div >
 <div className="f1">
 <div style={{ width: '33%'}}><div  className="f2" ><input type="text"  name="idEmployee" placeholder="ID" onChange={handleChange}required /></div><p className="error-message">Error message</p></div>
 <div  style={{ width: '33%'}} className="f2"><input   name="monthlySalary" placeholder="Salaire" onChange={handleChange}required /></div>
 <div style={{ width: '33%'}} className="f2"><input  style={{ width: '240px' }}  type="date" name="dateStartJob" placeholder="date de recrutement" onChange={handleChange} required/></div>

 </div>
 <div className="f1">
 
 <div  style={{ width: '50%' }}><div  className="f2"><input type="text"  name="email" placeholder="address email" onChange={handleChange} required/></div><p className="error-message">Error message</p> </div>
<div style={{ width: '50%' }}><div  className="f2"><input  type="text"  name="phoneNumber" placeholder="Phone Number" onChange={handleChange}required /></div><p className="error-message">Error message</p></div>
 </div>
 <div className="f1">
 
 <div style={{ width: '100%' }}><div   className="f2"><input type="text" name="bankAccount" placeholder="compte bancaire" onChange={handleChange} required/></div><p className="error-message">Error message</p></div>
 </div>
 <div className="f1">
 <div style={{ width: '33%' }} className="f2" >

 
      <div className="select-container">
        <select id="gender" name="gender" value={null} onChange={handleGenderChange}required>
        <option value="">sexe</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
         
        </select>
       </div> 
      </div>
      <div style={{ width: '33%' }} className="f2" >
      <div className="select-container">
        <select id="sitfam" name="sitfam" value={null} onChange={handlesitfamChange}required>
        <option value="">situation familialle</option>
          <option value="Marie">Marié</option>
          <option value="celibataire">célibataire</option>
         
        </select>
       </div> 
      </div>
      <div style={{ width: '33%' }} className="f2" >
      
      <div className="select-container">
        <select id="role" name="role" value={null} onChange={handleroleChange}required>
         
          <option value="president">président</option>
          <option value="tresorerie">trésorerie</option>
          <option value="membre">membre</option>
          <option value="employe">employé</option>
         
        </select>
        </div> 
      </div>


      

 
    

 </div>

 <div className="f1">
  
 {selectedsitfam === 'Marie' &&(
 <div style={{ width: '200px',  marginLeft: '35%' }}className="f2"><input type="text"  name="numberOfChild" placeholder="nombre d'enfants" onChange={handleChange} /></div> )}

<div className="btns">
    <button className="cancel">Annuler</button> 
     <button className="add" onClick={handleClick}>Ajouter</button>
</div>
 </div>
 <p>
  { //affiche le message d'erreur
//errorMessage
}</p>

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
              </td>
            </tr>
       ))}
      </tbody>
    </table>






           </div>
           {console.log(selectedEmployee)}
           {openModefy && selectedEmployee && <Modefyuser closeModefy={setOpenModefy} selectedEmployee={selectedEmployee} />}
      

           {openDelete && selectedEmployee && <Deleteuser  closeDelete={setOpenDelete} selectedEmployee={selectedEmployee} />}


           <div className="pagination-container">
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
    
    export default Formulaire ;