import React, { useState, useEffect } from "react";

import { FiPlusCircle } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { MdOutlineModeEditOutline } from "react-icons/md";
import axios from "axios";
import Deleteoffre from './Deleteoffre';
import Validateoffrepopup from './Validateoffrepopup';
import { Link } from "react-router-dom";
import Logo from "../Assets/Logo1.png";
import '../Styles/Offers.css';


 
const Offres = () => {
    const [openDeleteoffre, setopenDeleteoffre] = useState(false);
     const [openvalidateoffre, setopenvalidateoffre] = useState(false);
     const settings = {
        dots: false,
        infinite: true, // Show arrows only if there are more than 5 items
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1
      };
    
    // const [selectedformularie, setSelectedformularie] = useState(null);
   

    // useEffect(() => {
    //     const fetchFormularies = async () => {
    //         try {
    //             const response = await axios.get("http://localhost:8000/api/typesRequest");
    //             setFormularies(response.data);
    //         } catch (error) {
    //             console.error("Error fetching formularies:", error);
    //         }
    //     };

    //     fetchFormularies();
    // }, [formularies]);

    // const toggleExpand = (id) => {
    //     setFormularies((prevFormularies) =>
    //         prevFormularies.map((form) =>
    //             form._id === id ? { ...form, expand: !form.expand } : form
    //         )
    //     );
    // };

    // const fetchFormularieDetails = async (selectedformularieId) => {
    //     try {
    //         const response = await axios.get(`http://localhost:8000/api/typesRequest/${selectedformularieId}`);
    //         setSelectedformularie(response.data);
    //     } catch (error) {
    //         console.error('Error fetching formularie details:', error);
    //     }
    // };

   

    return (
        <div className="addoffrewrapper">
            <div className="addformbtn">
            <Link to='/formulaire/ajouteroffre/offreformulaire'><div  className="addoffre">
                   <button  >Ajouter offre</button>
                    <FiPlusCircle />
                </div></Link>
            </div>
            
                <div className="vali">
                     <span className="titleaddoffre"> Offres non valides</span>
                     <div className="offrecrap">
                    
                     <Link className="offrec" to='/formulaire/ajouteroffre/unvalideoffretype'>
                  
                     <img src={Logo} alt="logo" className="offimg2" />
                       <div className="titoff">Titre d'offre :</div>
                        <div className="descoff">Titre d'offreTitre d'offreTitre d'offreTitre d'offreTitre d'offreTitre d'offreTitre d'offre :</div>
                         <div className="offbtns"><button onClick={() => { setopenDeleteoffre(true); }}  className="offdel">Supprimer</button>
                        <button  className="offvalid" onClick={() => {setopenvalidateoffre(true); }}>Valider</button></div>

                        
                        </Link>
                         
                        
                    </div>


                
                     <Link to='/formulaire/ajouteroffre/offresunvalides'> <div className="vt">Voir tout</div> </Link>
                
                
                </div>





                <div className="vali">  <span className="titleaddoffre"> Offres valides</span>
                <div className="offrecrap">
                <Link className="offrec" to='/formulaire/ajouteroffre/offretype'>
                <img src={Logo} alt="logo" className="offimg3" />
                        <div className="titoff">Titre d'offre :</div>
                        <div className="descoff">Titre d'offreTitre d'offreTitre d'offreTitre d'offreTitre d'offreTitre d'offreTitre d'offre :</div>
                        

                        
                       </Link>
                    
                     </div>

                <Link to='/formulaire/ajouteroffre/offresvalides'> <div className="vt">Voir tout</div> </Link>
                </div>

               
                    {openDeleteoffre && <Deleteoffre closeDeleteoffre={setopenDeleteoffre}  />}
                 {openvalidateoffre && <Validateoffrepopup closeValidateoffre={setopenvalidateoffre}  />}
              
          






            </div>

           
      
    );
};

export default Offres;
