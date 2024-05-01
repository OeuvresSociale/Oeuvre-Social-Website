import React, { useState, useEffect } from "react";
import '../Styles/Offers.css';
import { FiPlusCircle } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { MdOutlineModeEditOutline } from "react-icons/md";
import axios from "axios";
import { Link } from "react-router-dom";


 
const Offres = () => {
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

    const handleClick = async (e) => {
    
        e.preventDefault();//not refreshing the page 
       
       };

    return (
        <div className="addoffrewrapper">
            <div className="addformbtn">
                <div  className="addoffre">
                    <Link to='/formulaire/ajouteroffre/offreformulaire'><button onClick={handleClick} >Ajouter offre</button></Link>
                    <FiPlusCircle />
                </div>
            </div>
            
                <div className="vali">
                     <span className="titleaddoffre"> Offres non valides</span>
                     <div className="offrecrap">
                        <div className="offrec">
                        <img className='offimg2' src={`${process.env.PUBLIC_URL}/images/logo.png`}  />
                        <div className="titoff">Titre d'offre :</div>
                        <div className="descoff">Titre d'offreTitre d'offreTitre d'offreTitre d'offreTitre d'offreTitre d'offreTitre d'offre :</div>
                         <div className="offbtns"><button  className="offdel">Supprimer</button>
                        <button  className="offvalid">Valider</button></div>

                        
                         </div>
                         <div className="offrec">
                        <img className='offimg2' src={`${process.env.PUBLIC_URL}/images/logo.png`}  />
                        <div className="titoff">Titre d'offre :</div>
                        <div className="descoff">Titre d'offreTitre d'offreTitre d'offreTitre d'offreTitre d'offreTitre d'offreTitre d'offre :</div>
                         <div className="offbtns"><button  className="offdel">Supprimer</button>
                        <button  className="offvalid">Valider</button></div>

                        
                         </div>
                    
                     </div>





                
                
                     <Link to='/formulaire/ajouteroffre/offresunvalides'> <div className="vt">Voir tout</div> </Link>
                
                
                </div>





                <div className="vali">  <span className="titleaddoffre"> Offres valides</span>
                <div className="offrecrap">
                       <div className="offrec">
                        <img className='offimg3' src={`${process.env.PUBLIC_URL}/images/logo.png`}  />
                         <Link to='/formulaire/ajouteroffre/offretype'><div className="titoff">Titre d'offre :</div></Link>
                        <div className="descoff">Titre d'offreTitre d'offreTitre d'offreTitre d'offreTitre d'offreTitre d'offreTitre d'offre :</div>
                        

                        
                         </div>
                    
                     </div>

                <Link to='/formulaire/ajouteroffre/offresvalides'> <div className="vt">Voir tout</div> </Link>
                </div>








            </div>

           
      
    );
};

export default Offres;
