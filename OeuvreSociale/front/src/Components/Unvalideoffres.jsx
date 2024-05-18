import React, { useState, useEffect } from "react";
import '../Styles/Valideoffres.css';
import { FiPlusCircle } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { MdOutlineModeEditOutline } from "react-icons/md";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsArrowLeftCircle } from "react-icons/bs";
import Deleteoffre from './Deleteoffre';
import Validateoffrepopup from './Validateoffrepopup';
import Logo from "../Assets/Logo1.png";



const Valideoffres = () => {
    const [openDeleteoffre, setopenDeleteoffre] = useState(false);
     const [openvalidateoffre, setopenvalidateoffre] = useState(false);
   
     const [unvalidatedOffers, setunValidatedOffers] = useState([]);

     useEffect(() => {
         // Fetch validated offers from the backend when the component mounts
         const fetchunValidatedOffers = async () => {
             try {
                 const response = await axios.get("http://localhost:8000/api/offres");
                 setunValidatedOffers(response.data); // Update state with fetched data
                 console.log("response:",response.data)
             } catch (error) {
                 console.error("Error fetching validated offers:", error);
             }
         };
 
         fetchunValidatedOffers();
     }, []); // Empty dependency array to fetch data only once when the component mounts
 

    return (
        <div className="addoffrewrapper4">
             <div className="addformbtn">
                 <Link to='/unvalideoffres/ajouteroffre'><div  className="addoffre">
                   <button>Ajouter offre</button>
                    <FiPlusCircle />
                </div></Link>
            </div>
           
  

                <div className="vali7">  <span className="titleaddoffre"> Offres non valides :</span>
                <div className="offrecrapv">
                {unvalidatedOffers.map((offer, index) => (<Link to='/formulaire/ajouteroffre/unvalideoffretype' className="offrecv">
                        <img src={Logo} alt="logo" className="offimg2" />
                        <div className="titoff">{offer.title}</div>
                        <div className="descoff">{offer.desc}</div>
                        <div className="offbtns"><button onClick={() => setopenDeleteoffre(true)} className="offdel">Supprimer</button>

                        <button onClick={() => setopenvalidateoffre(true)} className="offvalid">Valider</button>

                         </div>

                        
                      </Link>  ))}
                         
                    
                        
                       
                     </div>

                </div>
                {openDeleteoffre && <Deleteoffre closeDeleteoffre={setopenDeleteoffre}  />}
                 {openvalidateoffre && <Validateoffrepopup closeValidateoffre={setopenvalidateoffre}  />}
        </div>

           
      
    );
};

export default Valideoffres;
