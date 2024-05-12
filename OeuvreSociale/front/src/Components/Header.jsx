import react , { useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import "../Styles/Header.css";
import { Link, useLocation } from "react-router-dom";
import OIP from "../Assets/OIP.png";
import Logo from "../Assets/Logo1.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Header = () => {

  const [notificationMessage, setNotificationMessage] = useState("");

  const notify = async () => {
    try {
      // Make a POST request to your backend API endpoint
      const response = await axios.post('/api/send-notification', {
        message: "Your notification message here" // You can pass any data you want to send to the backend
      });

      // Handle the response if needed
      console.log(response.data); // Assuming your backend returns a response
      // Display a success toast if the notification is sent successfully
      toast.success('Notification sent successfully');
    } catch (error) {
      // Display an error toast if there's an error sending the notification
      toast.error('Failed to send notification');
      console.error('Error sending notification:', error);
    }
  };
  const location = useLocation();

  const { pathname } = location;

  const renderText = () => {
    switch (pathname) {
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

      case "/formulaire/ajouteroffre/offreformulaire":
        return "Formulaire d ajoute d offre";
      case "/formulaire/formulairepret":
        return "Ajoute formulaire du pret";
      case "/tables/loantype":
        return "Detailles des demandes";
      case "/formulaire/ajouteroffre":
        return "Ajouter offre";
      case "/formulaire/ajouteroffre/offresvalides":
        return "Ajouter offre";
      case "/formulaire/ajouteroffre/offresunvalides":
        return "Ajouter offre";
      case "/demandevalid":
        return "Demandes valides";
      case "/formulaire/ajouteroffre/offretype":
        return "Détails d offre";

      default:
        return "Dashboard";
    }
  };

  return (
    <div className="container">
      <div className="box1">
       
        <img src={Logo} alt="logo" className="logo5" />
      
        <div className="em">{renderText()}</div>
      </div>
      <div className="box2">
        <div className="notification">
          <IoNotificationsOutline onClick={notify} />
        </div>
       
        <img src={OIP} alt="logo" className="profile5" />
     
      </div>

      <ToastContainer />
    </div>
  );
};

export default Header;
