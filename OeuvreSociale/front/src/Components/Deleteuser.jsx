import React , {useState} from "react";
import '../Styles/Deleteuser.css';


const Deleteuser =({closeDelete})=>{






return (
    <div className="del">
     
<div className="btnsd">
<div className="vv">Voulez-vous vraiment supprimer cet utilisateur ?</div>  
<div className="bi">
<button className="b1"   onClick={  ()=> closeDelete(false)}  >  Annuler </button>
 <button className="b2"    onClick={  ()=> closeDelete(false)}  > Supprimer </button>
</div>
</div>
</div>


)





}
export default Deleteuser;