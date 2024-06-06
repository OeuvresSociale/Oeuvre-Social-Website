import React, { useState } from "react";
import '../Styles/Deleteoffre.css';
import axios from 'axios';
import { GoChecklist } from "react-icons/go";

const ValidateOffrepopup = ({ closeValidateoffre, offer }) => { 
  console.log("offre:", offer);
  const [error, setError] = useState(null);

  const handleValidate = async () => {
    try {
      await axios.put(`http://localhost:8000/api/validOffre/${offer._id}`);
      console.log("id:", offer._id);
      closeValidateoffre(false);
    } catch (err) {
      setError('Une erreur est survenue lors de la validation.');
    }
  };

  return (
    <div className="formtitlewrapper">
      <div className="validatoff">
        <div className="deletofficon1"><GoChecklist /></div>
        <div className="deletoff3">Vous êtes sur le point de valider une offre</div>
        <div className="deletoff4">Cela validera l'offre {offer.title} et l'ajoutera dans la liste des offres chez l'employé</div>
        <div className="deletoff4">Vous êtes sûr ?</div>
        <div className="formtitlebtns">
          <button className="formtitlecancel" onClick={() => { closeValidateoffre(false); }}>Annuler</button>
          <button className="offvalider" onClick={handleValidate}>Valider</button>
        </div>
      </div>
    </div>
  );
};

export default ValidateOffrepopup;
