import React ,{useState}from "react";
import '../Styles/Confirmform.css';
import { FiPlusCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { GoTrash } from "react-icons/go";
import axios from "axios";


const Confirmform = () => {
    
   

    
    const [inputText, setInputText] = useState('');
    const [textInput, setTextInput] = useState("");
    const [previewWords, setPreviewWords] = useState([]);
    const [textInputprix, setTextInputprix] = useState("");

    const handleTextInputprixChange = (event) => {
      setTextInputprix(event.target.value);
    };

    const handleTextInputChange = (event) => {
      setTextInput(event.target.value);
    };
  
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
            <span className="titlef">
              
               <input
            type="text"
            id="textInput"
            value={textInput}
            onChange={handleTextInputChange}
            placeholder="titre"
          />
          </span>
            
            <div className="adddocs"><input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Ajouter les documents necessaires"
      /><FiPlusCircle />
            </div>
           
               
            </div>
            <div className="previewContainer2">
        {previewWords.map((word, index) => (
          <div key={index} className="wordBox">
            {word} <GoTrash onClick={() => handleDeleteWord(index)}  />
          </div>
        ))}
        
      </div>
      <div  className="previewContainer"> Prix :<input
            type="text"
            id="textInputprix"
            value={textInputprix}
            onChange={handleTextInputprixChange}
            placeholder=" Entrer le nouveau Prix"
          /> </div>
           
        </div>
    );
};

export default Confirmform;