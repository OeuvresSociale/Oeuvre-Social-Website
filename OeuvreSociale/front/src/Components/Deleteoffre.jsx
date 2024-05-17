import React ,{useState}from "react";
import '../Styles/Deleteoffre.css';
import {useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";
import { GoTrash } from "react-icons/go";
import axios from 'axios';

const DeleteOffre = ({ closeDeleteoffre,offer }) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const handleDelete = async () => {
        setLoading(true);
        try {
            await axios.delete(`/api/offres/${offer._id}`);
            setLoading(false);
            closeDeleteoffre(false);
           
        } catch (err) {
            setLoading(false);
            setError('Une erreur est survenue lors de la suppression.');
        }
    };

   
    
   

    return (
        <div className="formtitlewrapper">
            <div className="deleteoffre">

               
                <div className="deletofficon">< GoTrash  /></div>
                    <div className="deletoff3">Vous etes sur le point de supprimer un offre</div>
                    <div className="deletoff4">Cela va supprimera l'offe {offer.title} définitivement</div>
                    <div className="deletoff4">Vous etes sur ?</div>
                   
                    <div className="formtitlebtns">
                        <button  className="formtitlecancel"onClick={() => { closeDeleteoffre(false); }} >Annuler</button>
                        <button  className="deletoffvalider" onClick={handleDelete} disabled={loading}>Supprimer</button>
                    </div>
               
            </div>
        </div>
    );
};

export default DeleteOffre;