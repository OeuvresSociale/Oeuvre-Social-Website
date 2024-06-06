import react , { useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { BsSearch } from "react-icons/bs";
import "../Styles/Header.css";
import { Link, useLocation } from "react-router-dom";
import OIP from "../Assets/OIP.png";
import Logo from "../Assets/Logo1.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBell, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import Notification from "./Notification"

import axios from 'axios';

const Header = () => {
  const [searchValue, setSearchValue] = useState('');
  const [showModal, setShowModal] = useState(false);

  

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    // Do something with the searchValue, for example, you can log it
    setSearchValue( searchValue);
  };

  
 

  const location = useLocation();

  const { pathname } = location;

  const renderText = () => {
    switch (pathname) {
      case "/FormularTab":
        return "Mes demandes";
        case "/offresvalides":
        return "Offres";
        case "/contact":
          return "contactez nous";
          case "/offre/${offer._id}":
            return"détailles d'offre";

            case "/reunions":
              return"Ajouter réunion"
              case "/reunions/historique":
                return"Historique des réunions";
                case "/reunions/historique/listreunion":
                return"Historique des réunions";

                case "/unvalideoffres":
                  return"Gestion des Offres";
                  case "/unvalideoffres/unvalideoffrestype":
                    return"Détailles d'Offres";


      case "/formulaire":
        return "Creation";
      case "/formulaire/formulairedemande":
        return "Ajouter formulaire de demande";
      case "/formulaire/formulairedemande/confirmformulaire":
        return "Ajouter formulaire de demande";

      case "/employeelist":
        return "Gestion des employés";
      case "/employeelist/Addemployee":
        return "Gestion des employés";
      case "/tables":
        return "Table des demandes";
      case "/tables/demandetype":
        return "Detailles des demandes";
      case "/profile":
        return "Belink";

      
      case "/formulaire/formulairepret":
        return " Formulaire du pret";
        case"/formulaire/formulairepret/modifierpret":
        return"modification du formulaire ";
      case "/tables/loantype":
        return "Detailles des demandes";


        case"/transaction":
        return"Gestion des fonds";
        case "/demandevalid":
          return"Table des demandes valides"
      
      
     

      default:
        return "Dashboard";
    }
  };
  

  return (
    <div className="container">
      <div className="box1">
       
        <img src={Logo} alt="logo" className="logo5" />
        <div className="em">{renderText()}</div>
        <div className="search">
        <BsSearch onClick={handleSearch} />
          <input
            id="searchInput"
            className="inp"
            type="text"
            placeholder="Rechercher..."
            pattern=''
            value={searchValue}
         onChange={handleChange}
          />
           
        </div>
        
       
      </div>
      
      <div className="header-right">
        <button className="icon-button">
          <FaBell className="icon" onClick={() => { setShowModal(!showModal); }}  />
        </button>
       <Link to="/profile/:id"> <button className="icon-button">
          <FaUserCircle className="icon" />
        </button></Link>
        <button className="icon-button">
          <FaSignOutAlt className="icon" />
        </button>
      </div>

    
      {showModal && <Notification  closeModel={setShowModal}/>}
   
    </div>
  );
};

export default Header;
