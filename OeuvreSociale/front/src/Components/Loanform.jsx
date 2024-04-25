import React , {useState} from "react";
import '../Styles/Loanform.css';
import { BsArrowLeftCircle } from "react-icons/bs";
import { Link } from "react-router-dom";


const Loanform =()=>{


    

return (
    <div className="loanformwrapp">
        <Link to='/formulaire/formulairepret/modifierpret'> <div > <div  className="modefypret">
                <button>Modifier</button>
              
            </div></div></Link>

          <Link to='/formulaire'> <div className="arrow"><BsArrowLeftCircle /></div> </Link>
           
           <div className="empinf">

<div className="loaninfs">
   <div className="colloaninf">
    <div className="loaninf"><div className="loan1">Prix maximal du pret :</div><div className="loan2">2000000000</div></div>
    <div className="loaninf"><div className="loan1">Mois maximal du remboursement :</div><div className="loan2">12</div></div>
    <div className="loaninf"><div className="loan1">Pourcentage maximal à rembourser chaque mois :</div><div className="loan2">30%</div></div>
    
   </div> 
  <div  className="colloaninf2"> 
  <div className="loaninf"><div className="loan1">Description :</div><div className="loandes">le formulaire de prêt pour les œuvres sociales est un outil important pour les employés qui ont besoin d'une assistance financière temporaire, permettant à l'organisation à vocation sociale de prendre des décisions éclairées et de fournir un soutien financier approprié à ses membres.</div>
  </div>
     
  </div> 

   


</div>




</div>

     

</div>


)





}
export default Loanform;