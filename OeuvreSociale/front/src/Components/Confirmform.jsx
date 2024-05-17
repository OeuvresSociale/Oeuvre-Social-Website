import React,{ useState, useEffect } from "react";
import '../Styles/Confirmform.css';
import { FiPlusCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { GoTrash } from "react-icons/go";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { BsArrowLeftCircle } from "react-icons/bs";
const Confirmform = () => {
    const [inputText, setInputText] = useState('');
    const [previewWords, setPreviewWords] = useState([]);
    const [textInputValue, setTextInputValue] = useState('');
    const [textInputprix, setTextInputprix] = useState('');
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);


    useEffect(() => {
        const textInputValueFromQuery = queryParams.get('text') || '';
        const textInputprixFromQuery = queryParams.get('prix') || '';
        setTextInputValue(textInputValueFromQuery);
        setTextInputprix(textInputprixFromQuery);
    }, [location.search]);

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
                title: textInputValue,
                amount: textInputprix,
                docs: previewWords,
            };
            const response = await axios.post('http://localhost:8000/api/typesRequest', formData);
            console.log('Form confirmed:', response.data);
            // Optionally, provide user feedback upon successful form submission
            // e.g., set a state to display a success message
        } catch (error) {
            console.error('Error confirming form:', error);
            // Optionally, provide user feedback upon form submission failure
            // e.g., set a state to display an error message
        }
    };
    
    return (
        <div className="confirmwrapper">
            <Link to='/formulaire/formulairedemande'> <div className="arrow"><BsArrowLeftCircle /></div> </Link>
            <div className="confirmform">
                {/* Removed unnecessary Link wrapper */}
                <button onClick={handleConfirmForm}>Confirmer</button>
            </div>
            <div className="formdocs">
                <span className="titlef"> {textInputValue}</span>
                <div className="adddocs">
                    <input
                        type="text"
                        value={inputText}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Ajouter les documents necessaires"
                    />
                    <FiPlusCircle />
                </div>
            </div>

            <div className="previewContainer2">
                {previewWords.map((word, index) => (
                    <div key={index} className="wordBox">
                        {word} <GoTrash onClick={() => handleDeleteWord(index)} />
                    </div>
                ))}
            </div>
            <div  className="previewContainer"> Prix : {textInputprix} </div>
        </div>
    );
};

export default Confirmform;
