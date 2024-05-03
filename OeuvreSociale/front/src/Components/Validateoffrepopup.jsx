import React ,{useState}from "react";
import '../Styles/Deleteoffre.css';
import {useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";
import { GoChecklist } from "react-icons/go";

const DeleteOffre = ({ closeValidateoffre }) => {
   
    
   

    return (
        <div className="formtitlewrapper">
            <div className="validatoff">

               
                <div className="deletofficon1"><GoChecklist /></div>
                    <div className="deletoff3">Vous etes sur le point de valider un offre</div>
                    <div className="deletoff4">Cela va validera l'offre "titre d'offre" et l'ajoutera dans la liste des offres chez l'employé </div>
                    <div className="deletoff4">Vous etes sur ?</div>
                   
                    <div className="formtitlebtns">
                        <button  className="formtitlecancel" onClick={() => { closeValidateoffre(false); }}>Annuler</button>
                        <button className="offvalider" onClick={() => { closeValidateoffre(false); }}>Valider</button>
                    </div>
               
            </div>
        </div>
    );
};

export default DeleteOffre;