import React, { useState, useEffect } from "react";
import '../Styles/Addform.css';
import { FiPlusCircle } from "react-icons/fi";
import Formtitle from "./Formtitle";
import { GoTrash } from "react-icons/go";
import { MdOutlineModeEditOutline } from "react-icons/md";
import Deleteform from "./Deleteform";
import axios from "axios";
import { Link } from "react-router-dom";


const Addform = () => {
    const [openFormtitle, setOpenFormtitle] = useState(false);
    const[openDelete,setOpenDeleteform]=useState(false);

    const [formularies, setFormularies] = useState([]);

  useEffect(() => {
   
    const fetchFormularies = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/getTypesRequest");
        setFormularies(response.data);
      } catch (error) {
        console.error("Error fetching formularies:", error);
      }
    };
    fetchFormularies();
}, []); 

const toggleExpand = (id) => {
  setFormularies((prevFormularies) =>
    prevFormularies.map((form) =>
      form.id === id ? { ...form, expand: !form.expand } : form
    )
  );
};

const handleDeleteForm = async (formId) => {
  try {
      // Send DELETE request to backend for form deletion
      await axios.delete(`http://localhost:8000/api/deleteTypeRequest/${formId}`);

      // If deletion is successful, update UI by removing the deleted form from state
      setFormularies((prevFormularies) =>
          prevFormularies.filter((form) => form.id !== formId)
      );
  } catch (error) {
      console.error("Error deleting form:", error);
  }
};

   
    
   
    
    return (
        <div className="addformwrapper">
           <div className="addformbtn"> <div onClick={() => { setOpenFormtitle(true); }} className="addform">
                <button>Ajouter formulaire</button>
                <FiPlusCircle />
            </div></div>
           
            {openFormtitle && <Formtitle closeFormtitle={setOpenFormtitle} />}
           
     <div className="formulswrapper">
     {formularies.map((form) => (
       <div key={form.id} className="formulary">
         <div className="linkform" onClick={() => toggleExpand(form.id)}>
           {form.title}
           <div className="addicons">
             <GoTrash   onClick={ () =>{setOpenDeleteform(true);}} />
             <Link to="/formulaire/formulairedemande/modefyformulaire" ><MdOutlineModeEditOutline /></Link>
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
   {openDelete && <Deleteform  closeDeleteform={setOpenDeleteform} onDeleteForm={handleDeleteForm}  />}
        </div>
    );
};

export default Addform;