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
        <div className="addoffrewrapper4">
             <div className="addformbtn">
                <div  className="addoffre">
                    <Link to='/formulaire/ajouteroffre/offreformulaire'><button>Ajouter offre</button></Link>
                    <FiPlusCircle />
                </div>
            </div>
            <Link to='/formulaire/ajouteroffre'> <div className="arrow"><BsArrowLeftCircle /></div> </Link>
  

                <div className="vali7">  <span className="titleaddoffre"> Offres non valides</span>
                <div className="offrecrapv">
                        <Link to='/formulaire/ajouteroffre/unvalideoffretype' className="offrecv">
                        <img src={Logo} alt="logo" className="offimg2" />
                        <div className="titoff">Titre d'offre :</div>
                        <div className="descoff">Titre d'offreTitre d'offreTitre d'offreTitre d'offreTitre d'offreTitre d'offreTitre d'offre :</div>
                        <div className="offbtns"><button onClick={() => { setopenDeleteoffre(true); }} className="offdel">Supprimer</button>
                        <button  className="offvalid" onClick={() => {setopenvalidateoffre(true); }}>Valider</button></div>

                        
                      </Link>
                         
                    
                        
                       
                     </div>

                </div>
                {openDeleteoffre && <Deleteoffre closeDeleteoffre={setopenDeleteoffre}  />}
                 {openvalidateoffre && <Validateoffrepopup closeValidateoffre={setopenvalidateoffre}  />}
        </div>

           
      
    );
};

export default Valideoffres;
