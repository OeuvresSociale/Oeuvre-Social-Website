import React ,{useState}from "react";
import '../Styles/Confirmform.css';
import { FiPlusCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { GoTrash } from "react-icons/go";
import axios from "axios";


const Confirmform = () => {
    
   

    
    const [inputText, setInputText] = useState('');
    const [previewWords, setPreviewWords] = useState([]);
  
    const handleInputChange = (event) => {
      setInputText(event.target.value);
    };
  
    const handleKeyDown = (event) => {
      if (event.key === 'Enter' && inputText.trim() !== '') {
        event.preventDefault(); 
        setPreviewWords((prevWords) => [...prevWords, inputText]);
        setInputText(''); 
      }
    };

    const handleDeleteWord = (index) => {
      setPreviewWords((prevWords) => prevWords.filter((_, i) => i !== index));
    };

    const handleConfirmForm = async () => {
      try {
        const formData = {
         
          words: previewWords,
        };
        const response = await axios.post('http://localhost:8000/api/typesRequest', formData);
        console.log('Form confirmed:', response.data);
       
      } catch (error) {
        console.error('Error confirming form:', error);
       
      }
    };
  
 
    
    return (
        <div className="confirmwrapper">
            <div className="confirmform">
            <Link  to="/formulaire/formulairedemande"  ><button  onClick={handleConfirmForm}>Confirmer</button></Link>
                
            </div>
            <div className="formdocs">
            <span className="titlef"> titre</span>
            <div className="adddocs"><input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Ajouter les documents necessaires"
      /><FiPlusCircle />
            </div>
           
               
            </div>
            <div className="previewContainer">
        {previewWords.map((word, index) => (
          <div key={index} className="wordBox">
            {word} <GoTrash onClick={() => handleDeleteWord(index)}  />
          </div>
        ))}
        
      </div>
           
        </div>
    );
};

export default Confirmform;