import React , {useState ,  useRef }from "react";
import '../Styles/Offretype.css';
import { Link } from "react-router-dom";
import { MdOutlineImage } from "react-icons/md";
import { BsArrowLeftCircle } from "react-icons/bs";




const Offretype =()=>{
  
       
      
 

 
 
 

return (
    
       
           
           <div className="addoffrewrapp11">
            <Link to='/formulaire/ajouteroffre'> <div className="arrow"><BsArrowLeftCircle /></div> </Link>
          

<div className="addoffrewrapp25"> 
<div className="ddimg5"> <div>L'image :</div>
<img className='offimg' src={`${process.env.PUBLIC_URL}/images/logo.png`}  />


    
      
   
   



</div>

<div className="loaninfst5">
   
  

<div className="rowinf">  <div className="gris5">Titre de l'offre :</div>   <div  className="noir">1234</div> </div>
    <div className="rowinf"> <div className="gris5">Date du début :</div>  <div  className="noir">12</div> </div>
    <div className="rowinf"> <div className="gris5">Date du fin :</div>  <div  className="noir">12</div> </div>
    <div className="juspret"> <div className="gris">Description :</div>    <div  className="jpnoir">Justification de pret</div></div>
 
  
   </div>




</div>
</div>



)

}
export default Offretype;
    


