import React, { useState, useEffect } from "react";
import '../Styles/Valideoffres.css';
import { FiPlusCircle } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { MdOutlineModeEditOutline } from "react-icons/md";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsArrowLeftCircle } from "react-icons/bs";
import Logo from "../Assets/Logo1.png";


const Valideoffres = () => {


    const [validatedOffers, setValidatedOffers] = useState([]);

    useEffect(() => {
        // Fetch validated offers from the backend when the component mounts
        const fetchValidatedOffers = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/validated-offres");
                setValidatedOffers(response.data); // Update state with fetched data
            } catch (error) {
                console.error("Error fetching validated offers:", error);
            }
        };

        fetchValidatedOffers();
    }, []); // Empty dependency array to fetch data only once when the component mounts

   

    return (
        <div className="addoffrewrapper4">
             <div className="addformbtn">
                <div  className="addoffre">
                    <Link to='/formulaire/ajouteroffre/offreformulaire'><button>Ajouter offre</button></Link>
                    <FiPlusCircle />
                </div>
            </div>
            <Link to='/formulaire/ajouteroffre'> <div className="arrow"><BsArrowLeftCircle /></div> </Link>
  

                <div className="vali7">  <span className="titleaddoffre"> Offres valides</span>
                <div className="offrecrapv">
                {validatedOffers.map((offer, index) => (
                        <Link to={`/offre/${offer.id}`} key={index} className="offrecv">
                            <img src={Logo} alt="logo" className="offimg3" />
                            <div className="titoff">{offer.title}</div>
                            <div className="descoff">{offer.desc}</div>
                        </Link>
                    ))}
                    
                    
                     </div>
                </div>
        </div>

           
      
    );
};

export default Valideoffres;