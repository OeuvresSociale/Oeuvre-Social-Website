import React ,{useState}from "react";
import '../Styles/Deleteoffre.css';
import {useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";
import { GoTrash } from "react-icons/go";

const DeleteOffre = ({ closeValidateoffre }) => {
   
    
   

    return (
        <div className="formtitlewrapper">
            <div className="deleteoffre">

               
                <div className="deletofficon">< GoTrash  /></div>
                    <div className="deletoff3">Vous etes sur le point de supprimer un offre</div>
                    <div className="deletoff4">Cela va supprimera l'offe "titre d'offre" définitivement</div>
                    <div className="deletoff4">Vous etes sur ?</div>
                   
                    <div className="formtitlebtns">
                        <button  className="formtitlecancel">Annuler</button>
                        <button  className="deletoffvalider">Supprimer</button>
                    </div>
               
            </div>
        </div>
    );
};

export default DeleteOffre;