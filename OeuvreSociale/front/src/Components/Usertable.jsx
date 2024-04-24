import React , {useState}from "react";
import { IoPersonAddOutline } from "react-icons/io5";
import { GoTrash } from "react-icons/go";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { Link } from 'react-router-dom';
import '../Styles/Usertable.css';
import { BsSearch } from "react-icons/bs";
import Deleteuser from "./Deleteuser";
import Modefyuser from "./Modefyuser";


const Usertable = () => {
  const[openDelete,setOpenDelete]=useState(false);
  const[openModefy,setOpenModefy]=useState(false);


    return (
      <div className="box">
        <div className="subbox">
           <div className="search">
            <input className="inp"  type="text" placeholder="rechercher..." />
            <BsSearch />
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
          <th>Nom</th>
          <th>Email</th>
          <th>Salaire</th>
          <th>Rôle</th>
          <th></th>
          
        </tr>
      </thead>
      <tbody>
        
         

          <tr>
            <td>123456789</td>
            <td>lakhal fz</td>
            <td>dahoun@esi-sba.dz</td>
            <td>40000</td>
            <td>admin</td>
            <td className="lastcolumn"><GoTrash   onClick={ () =>{setOpenDelete(true);}}  />
            <MdOutlineModeEditOutline   onClick={ () =>{setOpenModefy(true);}}   /></td>
          </tr>
       
      </tbody>
    </table>






           </div>

           {openModefy && <Modefyuser closeModefy={setOpenModefy } />}

           {openDelete && <Deleteuser  closeDelete={setOpenDelete} />}


      </div>


        );
    };
    
    export default Usertable ;