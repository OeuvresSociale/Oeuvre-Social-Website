import React, { useState, useEffect } from "react";
import '../Styles/Loantype.css';
import { Link } from 'react-router-dom';
import Motif from "./Motif";
import { PiFilePdfLight } from "react-icons/pi";
import { useParams } from 'react-router-dom';
import { BsArrowLeftCircle } from "react-icons/bs";
import axios from 'axios';

const Loantype = () => {
  const [openMotif, setOpenMotif] = useState(false);
  const [bordercolor, setbordercolor] = useState('white');
  const [showbuttons, setshowbuttons] = useState(true);
  const [padding, setpadding] = useState('0');

  const { id } = useParams();
  console.log("id:", id);
  const [loan, setRequest] = useState({
    _id: "",
    purpose: "",
    amount: "",
    duration: "",
    complete: "",
    employeeId: {
      _id: "",
      idEmployee: "",
      familyName: "",
      firstName: "",
      email: "",
      phoneNumber: "",
      dateStartJob: "",
      monthlySalary: "",
      familysitution: "",
    },
    requestTypeId: {
      title: "",
      _id: ""
    },
  });

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/Req/${id}`);
        setRequest(response.data);
        console.log("response:", response.data);
      } catch (error) {
        console.error("Error fetching request details:", error);
      }
    };
    fetchRequestDetails();
  }, [id]);

  const handleRedClick = () => {
    setbordercolor('red');
    setshowbuttons(false);
    setpadding(120);
  };

  const handleGreenClick = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/LaonRequest/${loan._id}`, {
        state: "Approuvée",
        motif: ""
      });

      setbordercolor("green");
      setshowbuttons(false);
      setpadding(120);
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  console.log("loan:", loan);

   return(
<div style={{ borderColor: bordercolor, borderStyle: 'solid',borderWidth:'1px' ,paddingBottom:padding}} className= 'demandetype'>
       <div className="return">
           <Link  to="/tables"  >
           <div className="arrow2"><BsArrowLeftCircle /></div>
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
               <div className="rowinf"> <div className="gris">Date d'envoi :</div>  <div  className="noir"> {new Date(loan.creationDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}</div></div>

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
          {openMotif && <Motif  closeMotif={setOpenMotif} handleRedClick={handleRedClick} loan={loan} context="Loan"/>}
      </div>

   );

};
export default Loantype;
