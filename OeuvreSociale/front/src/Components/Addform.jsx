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
    const[openDelete,setOpenDeleteform]=useState(false);
    const [selectedformularie, setSelectedformularie] = useState(null);
    const [formularies, setFormularies] = useState([]);
    const[openModefy,setOpenModefy]=useState(false);
    useEffect(() => {
      const fetchFormularies = async () => {
          let retryCount = 0; // Initialize retry count
          const maxRetries = 3; // Maximum number of retry attempts

          const fetchData = async () => {
              try {
                  const response = await axios.get("http://localhost:8000/api/typesRequest");
                  setFormularies(response.data);
              } catch (error) {
                  console.error("Error fetching formularies:", error);
                  if (error.response && error.response.status === 429) {
                      // Implement exponential backoff
                      const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff formula
                      await new Promise(resolve => setTimeout(resolve, delay));
                      retryCount++;
                      if (retryCount <= maxRetries) {
                          await fetchData(); // Retry fetching data
                      } else {
                          console.error("Max retry attempts reached.");
                      }
                  }
              }
          };

          await fetchData(); // Initial data fetch
      };

      fetchFormularies();
  }, []);

  const toggleExpand = (id) => {
    setFormularies((prevFormularies) =>
      prevFormularies.map((form) =>
        form._id === id ? { ...form, expand: !form.expand } : form
      )
    );
  };
  
  // Function to fetch details of a single 
  const fetchformularieDetails = async (selectedformularieId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/typesRequest/${selectedformularieId}`
      );
      setSelectedformularie(response.data);
       // Assuming data is an object containing details of the selected form
       
    } catch (error) {
      console.error('Error fetching formualarie details:', error);
    }
  }
   
    
   
    
    return (
        <div className="addformwrapper">
           <div className="addformbtn"> <div onClick={() => { setOpenFormtitle(true); }} className="addform">
                <button>Ajouter formulaire</button>
                <FiPlusCircle />
            </div></div>
           
            {openFormtitle && <Formtitle closeFormtitle={setOpenFormtitle} />}
           
            <div className="formulswrapper">
     {formularies.map((form) => (
       <div key={form._id} className="formulary">
         <div className="linkform" onClick={() =>{ toggleExpand(form._id);
         // fetchformularieDetails(form._id)
          }}>
           {form.title}
           <div className="addicons">
             <GoTrash    onClick={ async() => { fetchformularieDetails(form._id);setOpenDeleteform(true);  } }  />
             <Link to="/formulaire/formulairedemande/modefyformulaire" ><MdOutlineModeEditOutline onClick={async() =>  {setOpenModefy(true);fetchformularieDetails(form._id)}} /></Link>
           </div>
         </div>
         {form.expand && (
           <div className="docs">
             {form.docs.map((doc, index) => (
               <div key={index} className="docname">
                 {doc} </div>
             ))}
             
            
           </div>
         )}
       </div>
     ))}
   </div>
   {console.log(selectedformularie)}
   {openModefy && selectedformularie && <Modefyform closeModefy={setOpenModefy} selectedform={selectedformularie}  />}
   {openDelete && <Deleteform  closeDeleteform={setOpenDeleteform}   selectedform={selectedformularie}  />}
        </div>
    );
};

export default Addform;