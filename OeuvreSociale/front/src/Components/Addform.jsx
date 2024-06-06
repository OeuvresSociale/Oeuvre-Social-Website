import React, { useState, useEffect } from "react";
import '../Styles/Addform.css';
import { FiPlusCircle } from "react-icons/fi";
import Formtitle from "./Formtitle";
import { GoTrash } from "react-icons/go";
import { MdOutlineModeEditOutline } from "react-icons/md";
import Deleteform from "./Deleteform";
import axios from "axios";
import { Link } from "react-router-dom";

import Modefyform from "./Modefyform";

const Addform = () => {
    const [openFormtitle, setOpenFormtitle] = useState(false);
    const [openDelete, setOpenDeleteform] = useState(false);
    const [selectedformularie, setSelectedformularie] = useState(null);
    const [formularies, setFormularies] = useState([]);
    const [openModefy, setOpenModefy] = useState(false);

    useEffect(() => {
        const fetchFormularies = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/typesRequest");
                setFormularies(response.data);
            } catch (error) {
                console.error("Error fetching formularies:", error);
            }
        };

        fetchFormularies();
    }, [formularies]);

    const toggleExpand = (id) => {
        setFormularies((prevFormularies) =>
            prevFormularies.map((form) =>
                form._id === id ? { ...form, expand: !form.expand } : form
            )
        );
    };

    const fetchFormularieDetails = async (selectedformularieId) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/typesRequest/${selectedformularieId}`);
            setSelectedformularie(response.data);
        } catch (error) {
            console.error('Error fetching formularie details:', error);
        }
    };

    return (
        <div className="addformwrapper">
            <div className="addformbtn">
                <div onClick={() => { setOpenFormtitle(true); }} className="addform">
                    <button>Ajouter formulaire</button>
                    <FiPlusCircle />
                </div>
            </div>

            {openFormtitle && <Formtitle closeFormtitle={setOpenFormtitle} />}

            <div className="formulswrapper">
            <div className="formulary">
                        <Link to="/formulaire/formulairepret" className="linkform" >
                            Formulaire du pret
                            
                      </Link>
                       
                    </div>
                 {formularies.map((form) => (
                    <div key={form._id} className="formulary">
                        <div className="linkform" onClick={() => { toggleExpand(form._id);  }}>
                            {form.title}
                            <div className="addicons">
                                <GoTrash onClick={() => {setOpenDeleteform(true);fetchFormularieDetails(form._id);}} />
                                <Link to="/formulaire/formulairedemande/modefyformulaire">
                                    <MdOutlineModeEditOutline onClick={() => { setOpenModefy(true); fetchFormularieDetails(form._id); }} />
                                </Link>
                            </div>
                        </div>
                       
                        {form.expand && (
                            <div className="docs">
                            <div className="docname"> Prix : {form.price}
                            </div>
                                {form.docs.map((doc, index) => (
                                    <div key={index} className="docname">
                                        {doc}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))} 
                       
            </div>
            {selectedformularie && (
                <div>
                    {openModefy && <Modefyform closeModefy={setOpenModefy} selectedform={selectedformularie} />}
                    {openDelete && <Deleteform closeDeleteform={setOpenDeleteform} selectedform={selectedformularie} />}
                </div>
            )}
        </div>
    );
};

export default Addform;

