import React, { useState, useEffect } from "react";
import '../Styles/Valideoffres.css';
import { FiPlusCircle } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Link } from "react-router-dom";
import Page_Header from './Admin/bar_menu/Page_Header';
import Deleteoffre from './Deleteoffre';
import Validateoffrepopup from './Validateoffrepopup';
import Logo from "../Assets/Logo1.png";

const Valideoffres = () => {
  const [openDeleteoffre, setopenDeleteoffre] = useState(false);
  const [openvalidateoffre, setopenvalidateoffre] = useState(false);
  const [unvalidatedOffers, setunValidatedOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null); // Add state for selected offer

  useEffect(() => {
    const fetchunValidatedOffers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/invisibleOffres");
        setunValidatedOffers(response.data);
        console.log("response:", response.data);
      } catch (error) {
        console.error("Error fetching unvalidated offers:", error);
      }
    };

    fetchunValidatedOffers();
  }, []); // Pass an empty array to run this effect only once

  const handleDeleteClick = (offer, event) => {
    event.stopPropagation();
    setSelectedOffer(offer);
    setopenDeleteoffre(true);
  };

  const handleValidateClick = (offer, event) => {
    event.stopPropagation();
    setSelectedOffer(offer); // Set the selected offer
    setopenvalidateoffre(true);
  };

  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/unvalideoffres/unvalideoffrestype/${id}`);
  };

  return (
    <div className="addoffrewrapper4">
      <Link to='/unvalideoffres/ajouteroffre'>
        <div className="addoffre">
          <button>Ajouter offre</button>
          <FiPlusCircle />
        </div>
      </Link>

      <div className="vali7">
        <Page_Header title="Offres non valides" />
        <div className="offrecrapv">
          {unvalidatedOffers.map((offer) => (
            <div key={offer._id} onClick={() => handleCardClick(offer._id)} className="offrecv">
              <img src={Logo} alt="logo" className="offimg2" />
              <div className="titoff">{offer.title}</div>
              <div className="descoff">{offer.desc}</div>
              <div className="offbtns">
                <button onClick={(event) => handleDeleteClick(offer, event)} className="offdel">Supprimer</button>
                <button className="offvalid" onClick={(event) => handleValidateClick(offer, event)}>Valider</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {openDeleteoffre && selectedOffer && (
        <Deleteoffre 
          closeDeleteoffre={setopenDeleteoffre}  
          offer={selectedOffer}
        />
      )}
      {openvalidateoffre && selectedOffer && (
        <Validateoffrepopup 
          closeValidateoffre={setopenvalidateoffre} 
          offer={selectedOffer} // Pass the selected offer to the popup
        />
      )}
    </div>
  );
};

export default Valideoffres;
