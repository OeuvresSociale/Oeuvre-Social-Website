import React , {useState ,  useRef }from "react";
import '../Styles/Offretype.css';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { Link } from "react-router-dom";
import { MdOutlineImage } from "react-icons/md";
import { BsArrowLeftCircle } from "react-icons/bs";




const Offretype =()=>{
  
       
      
 

 
 
 

return (
    
       
           
           <div className="addoffrewrapp11">
            <Link to='/formulaire/ajouteroffre'> <div className="arrow"><BsArrowLeftCircle /></div> </Link>
          

<div className="addoffrewrapp2"> 
<div className="ddimg"> <div>L'image :</div>


    
      
   
   



</div>

<div className="loaninfst">
   <div className="colloaninft">
    <div className="loaninf"><div className="loan1">Titre de l'offre :</div><div className="loan2"><input  type="text"  placeholder="Entrer un titre d'offre" /></div></div>
   <div className="datesoffre"> <div style={{ width: '50%' }} className="loaninf"><div className="loan1">Date du début :</div><div  className="loan2"><input   type="date" name="dateStartJob" placeholder="date de recrutement" /></div></div>
    <div style={{ width: '50%' }} className="loaninf"><div  className="loan1">Date du fin :</div><div className="loan2"><input   type="date" name="dateStartJob" placeholder="date de recrutement" /></div></div>
    </div>
    
 
  <div className="loaninf"><div className="loan1">Description :</div><div className="loandes2"> </div>
  </div>
  </div>
   </div>




</div>
</div>



)

}
export default Offretype;
    


