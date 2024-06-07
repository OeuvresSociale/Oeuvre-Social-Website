import React, { useState, useEffect } from "react";
import '../Styles/Valideoffres.css';
import { FiPlusCircle } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { MdOutlineModeEditOutline } from "react-icons/md";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsArrowLeftCircle } from "react-icons/bs";
import Logo from "../Assets/Logo1.png";
import Page_Header from "./Admin/bar_menu/Page_Header";


const Valideoffres = () => {


    const [validatedOffers, setValidatedOffers] = useState([]);

    useEffect(() => {
        // Fetch validated offers from the backend when the component mounts
        const fetchValidatedOffers = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/visibleOffres");
                setValidatedOffers(response.data); // Update state with fetched data
                console.log("response:",response.data)
            } catch (error) {
                console.error("Error fetching validated offers:", error);
            }
        };

        fetchValidatedOffers();
    }, []); // Empty dependency array to fetch data only once when the component mounts

    // Get current date
  const currentDate = new Date();

  // Filter the offers to include only those that haven't finished
  const filteredOffers = validatedOffers.filter(offer => new Date(offer.dateFin) > currentDate);


    return (
        <div className="addoffrewrapper4">
             
  

                <div className="vali7">   <Page_Header title="Offres "  />
                <div className="offrecrapv">
                {filteredOffers.map((offer, index) => (
                       <Link to={`/offre/${offer._id}`} key={index} className="offrecv">
                            <img src={Logo} alt="logo" className="offimg3" />
                            <div className="titoff">{offer.title}</div>
                            <div className="descoff">{offer.desc}</div>
                        </Link>
                   ))}
                      {/* //  <Link to={`/offre/`} className="offrecv">
                    //         <img src={Logo} alt="logo" className="offimg3" />
                    //         <div className="titoff">offer.title</div>
                    //         <div className="descoff">/c</div>
                    //     </Link>
                     */}
                    
                    
                     </div>
                </div>
        </div>

           
      
    );
};

export default Valideoffres;