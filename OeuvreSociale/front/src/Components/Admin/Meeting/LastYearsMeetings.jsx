import React, { useState, useEffect } from "react";
import '../../../Styles/Addform.css';

import { Link } from "react-router-dom";



const Addform = () => {
   
    
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
    // }, []);

   

    // const fetchFormularieDetails = async (selectedformularieId) => {
    //     try {
    //         const response = await axios.get(`http://localhost:8000/api/typesRequest/${selectedformularieId}`);
    //         setSelectedformularie(response.data);
    //     } catch (error) {
    //         console.error('Error fetching formularie details:', error);
    //     }
    // };

    return (
       

            <div className="formulsrapper">
           
                 
                   
                        <div className="linkwrapper" >
                        <div className="linktodem"> reunion 1 </div><div className="linktodem"> date </div><div className="linktodem">heure </div>
                        </div>
                        <div className="linkwrapper" >
                        <div className="linktodem">reunion2</div>
                        </div>
                        <div className="linkwrapper" >
                        <div className="linktodem"> reunion3</div>
                        </div>
                        
                       
                       
                    
             
                       
            </div>
           
       
    );
};

export default Addform;

