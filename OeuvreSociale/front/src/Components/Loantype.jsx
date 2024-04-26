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
               <div className="rowinf">  <div className="gris">Nom :</div>   <div  className="noir">Lakhal</div> </div>
               <div className="rowinf"> <div className="gris">Prénom :</div>  <div  className="noir">Fatima</div> </div>
               <div className="rowinf"> <div className="gris">ID :</div>    <div  className="noir">1234</div></div>
               <div className="rowinf">  <div className="gris">Situation famillialle :</div>  <div  className="noir">Célibataire</div></div>

             </div> 
            <div  className="colinf"> 
               <div className="rowinf">   <div className="gris">Numéro de téléphone :</div>   <div  className="noir">1234567890</div></div>
               <div className="rowinf">   <div className="gris">Adressr email :</div> <div  className="noir">yourmail@esi-sba.dz</div></div>
               <div className="rowinf"> <div className="gris">Salaire :</div>  <div  className="noir">123400</div></div>
               <div className="rowinf"> <div className="gris">Date d'envoi :</div>  <div  className="noir">jj/mm/aaaa</div></div>

            </div> 

             


          </div>




       </div>

           <div className="lowinf">

           <div className="rowinf">  <div className="gris">La somme à preter :</div>   <div  className="noir">1234</div> </div>
               <div className="rowinf"> <div className="gris">Nombre de mois de remboursement :</div>  <div  className="noir">12</div> </div>
               <div className="juspret"> <div className="gris">Justification de pret :</div>    <div  className="jpnoir">Justification de pret</div></div>
           

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
