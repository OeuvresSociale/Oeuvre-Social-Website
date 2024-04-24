import React , {useState} from "react";
import '../Styles/Deleteuser.css';


const Deleteform =({ closeDeleteform, onDeleteForm })=>{


    const handleDelete = () => {
        // Call onDeleteForm callback to handle deletion
        onDeleteForm(); // You can pass any necessary parameters here
        closeDeleteform(false);
    };



return (
    <div className="del">
     
<div className="btnsd">
<div className="vv">Voulez-vous vraiment supprimer cet formulaire ?</div>  
<div className="bi">
<button className="b1"   onClick={  ()=> closeDeleteform(false)}  >  Annuler </button>
 <button className="b2"    onClick={ handleDelete}  > Supprimer </button>
</div>
</div>
</div>


)





}
export default Deleteform;