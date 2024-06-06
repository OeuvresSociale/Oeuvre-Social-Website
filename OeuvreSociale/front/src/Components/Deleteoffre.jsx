import React, { useState } from "react";
import '../Styles/Deleteoffre.css';
import axios from 'axios';
import { GoTrash } from "react-icons/go";

const DeleteOffre = ({ closeDeleteoffre, offer }) => { 
    const [error, setError] = useState(null);
    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/offre/${offer._id}`);
            console.log("Response from backend:", response); // Log the response
            closeDeleteoffre(false);
        } catch (err) {
            console.error("Error:", err); // Log any errors
            setError('Une erreur est survenue lors de la suppression.');
        }
    };
    

    return (
        <div className="formtitlewrapper">
            <div className="deleteoffre">
                <div className="deletofficon"><GoTrash /></div>
                <div className="deletoff3">Vous êtes sur le point de supprimer un offre</div>
                <div className="deletoff4">Cela va supprimer l'offre {offer.title} définitivement</div>
                <div className="deletoff4">Vous êtes sûr ?</div>
                <div className="formtitlebtns">
                    <button className="formtitlecancel" onClick={() => { closeDeleteoffre(false); }}>Annuler</button>
                    <button className="deletoffvalider" onClick={handleDelete}>Supprimer</button>
                    
                </div>
            </div>
        </div>
    );
};

export default DeleteOffre;
