import React, { useState, useEffect } from "react";
import '../Styles/Valideoffres.css';
import { FiPlusCircle } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { MdOutlineModeEditOutline } from "react-icons/md";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsArrowLeftCircle } from "react-icons/bs";




const Valideoffres = () => {
    // const [openFormtitle, setOpenFormtitle] = useState(false);
    // const [openDelete, setOpenDeleteform] = useState(false);
    // const [selectedformularie, setSelectedformularie] = useState(null);
    // const [formularies, setFormularies] = useState([]);
    // const [openModefy, setOpenModefy] = useState(false);

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
  

                <div className="vali7">  <span className="titleaddoffre"> Offres valides</span>
                <div className="offrecrapv">
                       <div className="offrecv">
                        <img className='offimg3' src={`${process.env.PUBLIC_URL}/images/logo.png`}  />
                         <Link to='/formulaire/ajouteroffre/offretype'><div className="titoff">Titre d'offre :</div></Link>
                        <div className="descoff">Titre d'offreTitre d'offreTitre d'offreTitre d'offreTitre d'offreTitre d'offreTitre d'offre :</div>
                   
                        
                         
                        
                         </div>
                    
                    
                     </div>
                </div>
        </div>

           
      
    );
};

export default Valideoffres;