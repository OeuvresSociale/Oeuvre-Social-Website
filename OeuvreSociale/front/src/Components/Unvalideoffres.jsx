import React, { useState, useEffect } from "react";
import '../Styles/Valideoffres.css';
import { FiPlusCircle } from "react-icons/fi";
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import Page_Header from './Admin/bar_menu/Page_Header';
import Deleteoffre from './Deleteoffre';
import Validateoffrepopup from './Validateoffrepopup';
import Logo from "../Assets/Logo1.png";

const Valideoffres = () => {
  const [openDeleteoffre, setOpenDeleteoffre] = useState(false);
  const [openValidateoffre, setOpenValidateoffre] = useState(false);
  const [unvalidatedOffers, setUnvalidatedOffers] = useState([]);
  const [validatedOffers, setValidatedOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUnvalidatedOffers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/invisibleOffres");
        setUnvalidatedOffers(response.data);
        console.log("Unvalidated offers response:", response.data);
      } catch (error) {
        console.error("Error fetching unvalidated offers:", error);
      }
    };

    fetchUnvalidatedOffers();
  }, []);
  
  useEffect(() => {
    const fetchValidatedOffers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/visibleOffres");
        setValidatedOffers(response.data);
        console.log("Validated offers response:", response.data);
      } catch (error) {
        console.error("Error fetching validated offers:", error);
      }
    };

    fetchValidatedOffers();
  }, []);

  const handleDeleteClick = (offer, event) => {
    event.stopPropagation();
    setSelectedOffer(offer);
    setOpenDeleteoffre(true);
  };

  const handleValidateClick = (offer, event) => {
    event.stopPropagation();
    setSelectedOffer(offer);
    setOpenValidateoffre(true);
  };


  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/unvalideoffres/unvalideoffrestype/${id}`);
  };


  return (
    <div>
      
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
            closeDeleteoffre={setOpenDeleteoffre}  
            offer={selectedOffer}
          />
        )}
        {openValidateoffre && selectedOffer && (
          <Validateoffrepopup 
            closeValidateoffre={setOpenValidateoffre} 
            offer={selectedOffer}
          />
        )}
      </div>
      <div className="addoffrewrapper4">
        <div className="vali7">
          <Page_Header title="Offres valides" />
          <div className="offrecrapv">
            {validatedOffers.map((offer, index) => (
              <Link to={`/offre/${offer._id}`} key={index} className="offrecv">
                <img src={Logo} alt="logo" className="offimg3" />
                <div className="titoff">{offer.title}</div>
                <div className="descoff">{offer.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Valideoffres;
