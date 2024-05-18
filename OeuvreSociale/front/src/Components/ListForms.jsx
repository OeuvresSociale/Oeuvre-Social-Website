import React, { useState, useEffect } from "react";
import "../Styles/listForms.css";
import { FaRegFilePdf, FaArrowUp } from "react-icons/fa";
import Addloandemande from "./Addloandemande";
import axios from "axios";
import { InsertDriveFile } from "@mui/icons-material";
function Forms() {
  const [links, setLinks] = useState([]);
  const [showPop, setShowPop] = useState(false);
  const [selectedPopDetails, setSelectedPopDetails] = useState(null);
  const [files, setFiles] = useState([]); // State to store uploaded files
  const [fileNames, setFileNames] = useState([]); // State to store selected file names
  const [showPop2, setShowPop2] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    date: "",
    Amount: "",
    categorie: "",
    files: null,


  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/typesRequest");
        setLinks(response.data);
      } catch (error) {
        console.error('Error fetching type requests:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
  try {
    const formData = new FormData();
    formData.append('requestTypeId', selectedPopDetails._id);
    formData.append('employeeId', '662b6d845103d0588235a182'); // Remplacez 'EMPLOYEE_ID' par l'ID réel de l'employé

    // Ajoutez le type de demande aux données envoyées

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    const response = await axios.post("http://localhost:8000/api/Requests", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    console.log('Response:', response.data);
    alert("request saved successfully");
     setShowPop(false);
  } catch (error) {
    console.error('Error submitting request:', error);
    alert("Failed to save request. Please try again.");
     setShowPop(false);
  }
};

  const handleLinkClick = async (popId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/typesRequest/${popId}`);
      setSelectedPopDetails(response.data);
      setShowPop(true);
    
      
    } catch (error) {
      console.error('Error fetching type request details:', error);
       
    }
  };

  const closePop = () => {
    setShowPop(false);
    setSelectedPopDetails(null);
  };
  const handleChange = (e, docIndex) => {
  const uploadedFiles = e.target.files;
  const newFiles = [...files]; // Copiez la liste des fichiers existante
  
  // Vérifiez si des fichiers sont sélectionnés
  if (uploadedFiles && uploadedFiles.length > 0) {
    // Remplacez le fichier existant à l'index donné par le nouveau fichier
    newFiles[docIndex] = uploadedFiles[0];
    
    // Mettez à jour le nom du fichier pour l'affichage
    const newFileNames = [...fileNames];
    newFileNames[docIndex] = uploadedFiles[0].name;
    setFileNames(newFileNames);
  }
  
  setFiles(newFiles); // Mettez à jour la liste des fichiers dans le state
};


  return (
    <div className="formsrapper">
      <h2 className="title">Types des demandes</h2>
      <div className="linkrapper" onClick={() => { setShowPop2(true); }}>
        <div className="linktdem">
          Demander pret 
        </div>
      </div>
      {links.map((link, index) => (
        <div key={index} className="linkrapper" onClick={() => handleLinkClick(link._id)}>
          <div className="linktdem">
            {link.title}
          </div>
        </div>
      ))}
      {showPop && (
        <div className="popModal">
          <div className="popContent">
            <h2 className="poptitle">{selectedPopDetails.title}</h2>
            <ul className="inputList">
              {selectedPopDetails.docs.map((doc, index) => (
                <li key={index}> 
                  <div className="Label">{doc} : </div>
               <div className="pdf-field">
      <label className="file-label">
        <input
          type="file"
          accept=".pdf"
          name={`files_${index}`} // Nom unique pour chaque champ de fichier
          onChange={(e) => handleChange(e, index)} // Passez l'index du document à handleChange
          required
          className="file-input"
        />
        <span className="file-icon">
          <InsertDriveFile />
        </span>
        <span className="file-text">{fileNames[index]}</span> {/* Utilisez l'index pour le texte du fichier */}
      </label>
    </div>
                </li>
              ))}
            </ul>
            <div className="buttonsWrapper">
              <button className="cancelButton" onClick={closePop}>Cancel</button>
              <button className="validateButton" onClick={handleSubmit}>Validate</button>
            </div>
          </div>
        </div>
      )}
      {showPop2 && <Addloandemande closeit={setShowPop2} />}
    </div>
  );
}

export default Forms;
