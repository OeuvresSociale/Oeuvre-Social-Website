import React ,{useState,useEffect}from "react";
import '../Styles/Demandetypes.css';
import { Link } from 'react-router-dom';
import Motif from "./Motif";
import { PiFilePdfLight } from "react-icons/pi";
import axios from 'axios';

//info sur une demande cote admin ( traitement de demande)

const Demandetypes =({ closeModefy, selectedRequest })=>{

   const[openMotif,setOpenMotif]=useState(false);
   const[bordercolor,setbordercolor]=useState('white');
   const[showbuttons,setshowbuttons]=useState(true);
   const[padding,setpadding]=useState('0');
   const [error, setError]=useState(null);

   const [request, setRequests] = useState({
    idEmployee: '',
    firstName: '',
    familyName: '',
    email: '',
    phoneNumber: "" ,
    familysitution:"",
    title:'',
    files:''
});
   
  
    useEffect(() => {
      if(selectedRequest){
        setRequests({
          idEmployee: selectedRequest.employeeId,
          firstName: selectedRequest.employeeId.firstName,
          familyName: selectedRequest.employeeId.familyName,
          email: selectedRequest.employeeId.email,
          phoneNumber: selectedRequest.employeeId.phoneNumber ,
          familysitution:selectedRequest.employeeId.familysitution,
          title:selectedRequest.requestTypeId.title,
          files:selectedRequest.files
        });
      }
    },[selectedRequest]);


  //  useEffect(() => {
  //   const fetchRequests = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:8000/api/Request/662cc31d29adc7ff42f34823`, { responseType: 'json', responseEncoding: 'utf8' });
  //       setRequest(response.data); // Assuming response.data is an array of employee objects
  //     } catch (error) {
  //       console.error('Error fetching requests:', error);
  //       setError(error);
  //       setRequest([]);
  //     }
  //   };

  //   fetchRequests();
  // });
  

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
      <div className="td">{request.title}</div>
      <div className="empinf">

          <div className="infs">
             <div className="colinf">
               <div className="rowinf">  <div className="gris">Nom :</div>   <div  className="noir">{request.familyName}</div> </div>
               <div className="rowinf"> <div className="gris">Prénom :</div>  <div  className="noir">{request.firstName}</div> </div>
               <div className="rowinf"> <div className="gris">ID :</div>    <div  className="noir">{request.idEmployee}</div></div>
               <div className="rowinf">  <div className="gris">Situation famillialle :</div>  <div  className="noir">{request.familysitution}</div></div>

             </div> 
            <div  className="colinf"> 
               <div className="rowinf">   <div className="gris">Numéro de téléphone :</div>   <div  className="noir">{request.phoneNumber}</div></div>
               <div className="rowinf">   <div className="gris">Adressr email :</div> <div  className="noir">{request.email}</div></div>
               <div className="rowinf"> <div className="gris">Salaire :</div>  <div  className="noir">{request.monthlySalary}</div></div>
               <div className="rowinf"> <div className="gris">Date d'envoi :</div>  <div  className="noir">{request.creationDate}</div></div>

            </div> 

             


          </div>




       </div>

           <div className="pdfs">

            <div className="pdfdoc">
               <div  className="doctitle">Premier document :</div>
               <div className="doclink"><a 
        href="../Assets/homework.pdf"  //request.files
        target="_blank"
        rel="noopener noreferrer"
      > <PiFilePdfLight />
      </a></div>
             </div>

             <div className="pdfdoc">
               <div className="doctitle">Premier document :</div>
               <div className="doclink"> <a 
        href="../Assets/homework.pdf"
        target="_blank"
        rel="noopener noreferrer"
      > <PiFilePdfLight />
      </a></div>
             </div>

             <div className="pdfdoc">
               <div className="doctitle">Premier document :</div>
               <div className="doclink"><a 
        href="../Assets/homework.pdf"
        target="_blank"
        rel="noopener noreferrer"
      > <PiFilePdfLight />
      </a></div>
             </div>

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
export default Demandetypes;