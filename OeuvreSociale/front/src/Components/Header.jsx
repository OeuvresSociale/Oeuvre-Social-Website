import react from 'react';
import { IoNotificationsOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import '../Styles/Header.css';
import { Link, useLocation } from 'react-router-dom';
import Logo1 from '../Assets/Logo1.png';
import OIP from '../Assets/OIP.png';

const Header = () => {

  const location = useLocation();

  
  const { pathname } = location;

  
  const renderText = () => {
    switch (pathname) {
      case '/formulaire':
        return 'Creation';
        case '/formulaire/formulairedemande':
        return 'Ajouter formulaire de demande';
      case '/formulaire/formulairedemande/confirmformulaire':
      return 'Ajouter formulaire de demande';

      case '/employeelist':
        return 'Gestion des employés';
      case '/employeelist/Addemployee':
        return 'Gestion des employés';
      case '/tables':
        return 'Table des demandes';
        case '/tables/demandetype':
          return 'Detailles des demandes';
          case '/profile':
            return 'Belink';


        case '/formulaire/ajouteroffre/offreformulaire':

            return 'Formulaire d ajoute d offre';
            case '/formulaire/formulairepret':
              return 'Ajoute formulaire du pret';
              case '/tables/loantype':
                return 'Detailles des demandes';
                case '/formulaire/ajouteroffre':
                  return 'Ajouter offre';
                  case '/formulaire/ajouteroffre/offresvalides':
                    return 'Ajouter offre';
                    case '/formulaire/ajouteroffre/offresunvalides':
                      return 'Ajouter offre';
                      case '/demandevalid':
                        return 'Demandes valides';
                        case '/formulaire/ajouteroffre/offretype':
                          return 'Détails d offre';
              
         
      default:
        return 'Dashboard';
    }
  };




  return (
   <div className='container'>
<div className='box1'>
    <div className='logo'><img src='../Assets/Logo.png' /></div> 
    <div className='em'>{renderText()}</div>
</div>
<div className='box2'>
<div className='notification'><IoNotificationsOutline /></div>
<div className='profile' ><img src='../Assets/OIP.png' /></div>

</div>


   </div>
  );
};

export default Header ;
