import React ,{useState}from "react";
import '../Styles/Loantype.css';
import { Link } from 'react-router-dom';
import Motif from "./Motif";
import { PiFilePdfLight } from "react-icons/pi";


const Loantype =()=>{
   const[openMotif,setOpenMotif]=useState(false);
   const[bordercolor,setbordercolor]=useState('white');
   const[showbuttons,setshowbuttons]=useState(true);
   const[padding,setpadding]=useState('0');


   const [loan, setRequest] = useState({
      _id: "",
    
    employeeId: {
      _id: "",
      idEmployee: "",
      familyName: "",
      firstName: "",
      email: "",
      phoneNumber: "",
      monthlySalary: "",
      familysitution: "",
    },
    amount:"",
    duration:"",
    purpose:"",
  });

   //   useEffect(() => {
   //     const fetchRequestDetails = async () => {
   //       try {
   //         const response = await axios.get(
   //           `http://localhost:8000/api/Request/${id}`
   //         );
   
   //         setRequest(response.data);
   //         // Assuming data is an object containing details of the selected employee
   //       } catch (error) {
   //         alert(error.response.data);
   //         console.error("Error fetching request details:", error);
   //       }
   //     };
   //     fetchRequestDetails();
   //   }, []);

   


  

   const handleRedClick=()=>{
    setbordercolor('red');
    setshowbuttons(false);
    setpadding(120);
  
   };
   const handleGreenClick=()=>{
    setbordercolor('green');
    setshowbuttons(false);
    setpadding(120);
   };

   
   return(
<div style={{ borderColor: bordercolor, borderStyle: 'solid',borderWidth:'1px' ,paddingBottom:padding}} className= 'demandetype'>
       <div className="return">
           <Link  to="/tables"  >
              <button>
              Return
            </button>
            </Link>
      </div>
      <div className="td">Demande de pret</div>
      <div className="empinf">

          <div className="infs">
             <div className="colinf">
               <div className="rowinf">  <div className="gris">Nom :</div>   <div  className="noir">{loan.employeeId.familyName}</div> </div>
               <div className="rowinf"> <div className="gris">Prénom :</div>  <div  className="noir">{loan.employeeId.firstName}</div> </div>
               <div className="rowinf"> <div className="gris">ID :</div>    <div  className="noir">{loan.employeeId.idEmployee}</div></div>
               <div className="rowinf">  <div className="gris">Situation famillialle :</div>  <div  className="noir">{loan.employeeId.familysitution}</div></div>

             </div> 
            <div  className="colinf"> 
               <div className="rowinf">   <div className="gris">Numéro de téléphone :</div>   <div  className="noir">{loan.employeeId.phoneNumber}</div></div>
               <div className="rowinf">   <div className="gris">Adressr email :</div> <div  className="noir">{loan.employeeId.email}</div></div>
               <div className="rowinf"> <div className="gris">Salaire :</div>  <div  className="noir">{loan.employeeId.monthlySalary}</div></div>
               <div className="rowinf"> <div className="gris">Date d'envoi :</div>  <div  className="noir">jj/mm/aaaa</div></div>

            </div> 

             


          </div>




       </div>

           <div className="lowinf">

           <div className="rowinf">  <div className="gris">La somme à preter :</div>   <div  className="noir">{loan.amount}</div> </div>
               <div className="rowinf"> <div className="gris">Nombre de mois de remboursement :</div>  <div  className="noir">{loan.duration}</div> </div>
               <div className="juspret"> <div className="gris">Justification de pret :</div>    <div  className="jpnoir">{loan.purpose}</div></div>
           

           </div>
           {showbuttons && (

           <div className="dtbtns">
            <button className="refuse"   onClick={ ()=>{ setOpenMotif(true)}}>Réfuser</button>
             <button className="accepte" onClick={handleGreenClick}   >Accepter</button>




           </div> )}



           {openMotif && <Motif  closeMotif={setOpenMotif} handleRedClick={handleRedClick} />}


      </div>
   
   





   );






};
export default Loantype;
