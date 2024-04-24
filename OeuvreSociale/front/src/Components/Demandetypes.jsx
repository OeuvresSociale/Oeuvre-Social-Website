import React ,{useState}from "react";
import '../Styles/Demandetypes.css';
import { Link } from 'react-router-dom';
import Motif from "./Motif";
import { PiFilePdfLight } from "react-icons/pi";


const Demandetypes =()=>{
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
      <div className="td">Type de demande</div>
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

           <div className="pdfs">

            <div className="pdfdoc">
               <div  className="doctitle">Premier document :</div>
               <div className="doclink"><a 
        href="../Assets/homework.pdf"
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