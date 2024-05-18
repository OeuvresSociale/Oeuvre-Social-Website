import React ,{useState}from "react";
import '../Styles/Deleteoffre.css';
import axios from 'axios';
import { GoChecklist } from "react-icons/go";

const DeleteOffre = ({ closeValidateoffre,offer }) => {

   
    const [error, setError] = useState(null);

    const handleValidate = async () => {
       
        try {
            await axios.post(`/api/offres/validate/${offer.id}`);
           
            closeValidateoffre(false);
          
        } catch (err) {
           
            setError('Une erreur est survenue lors de la validation.');
        }
    };
   
    
   

    return (
        <div className="formtitlewrapper">
            <div className="validatoff">

               
                <div className="deletofficon1"><GoChecklist /></div>
                    <div className="deletoff3">Vous etes sur le point de valider un offre</div>
                    <div className="deletoff4">Cela va validera l'offre {offer.title}  et l'ajoutera dans la liste des offres chez l'employé </div>
                    <div className="deletoff4">Vous etes sur ?</div>
                   
                    <div className="formtitlebtns">
                        <button  className="formtitlecancel" onClick={() => { closeValidateoffre(false); }}>Annuler</button>
                        <button className="offvalider" onClick={handleValidate} >Valider</button>
                    </div>
               
            </div>
        </div>
    );
};

export default DeleteOffre;