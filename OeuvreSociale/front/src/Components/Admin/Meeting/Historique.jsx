import React ,{useState}from "react";
import '../../../Styles/Formuls.css';
import { Link } from 'react-router-dom';


const Formuls =() =>{
  
return(

<div  className="formulsrapper">
<Link  to="/reunions/historique/listreunion" className="linkwrapper" >
    <div className="linktodem"> 2024</div>    

</Link>    

   <Link  to="/reunions/historique/listreunion" className="linkwrapper" >
  <div className="linktodem"> 2023</div>

    </Link>  
    <Link  to="/reunions/historique/listreunion" className="linkwrapper" >
  <div className="linktodem"> 2022</div>

    </Link>  
    <Link  to="/reunions/historique/listreunion" className="linkwrapper" >
  <div className="linktodem"> 2021</div>

    </Link>  
   

</div>

);
};
export default Formuls;