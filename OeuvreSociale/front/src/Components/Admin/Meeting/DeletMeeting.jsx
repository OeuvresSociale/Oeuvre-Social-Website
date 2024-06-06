import '../../../Styles/Deleteuser.css';
import axios from 'axios';

const Deleteuser =({closeDelete,meeting})=>{



    const handleDelete = async () => {
        try {
          await axios.delete(`http://localhost:8000/api/meeting/${meeting._id}`);
          closeDelete(false);
        } catch (error) {
          console.error('Error deleting user:', error);
        }
    }




return (
    <div className="del">
     
<div className="btnsd">
<div className="vv"> Voulez-vous vraiment annuler cet réunion ?</div>  
<div className="bi">
<button className="b1"   onClick={  ()=> closeDelete(false)}  >  Annuler </button>
 <button className="b2"    onClick={ handleDelete}  > Supprimer </button>
</div>
</div>
</div>


)





}
export default Deleteuser;