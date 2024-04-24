import React ,{useState}from "react";
import '../Styles/Formtitle.css';
import {useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";


const Formtitle = ({ closeFormtitle }) => {
   
    const [textInput, setTextInput] = useState('');
    const navigate = useNavigate();

    

    const handleTextInputChange = (event) => {
        setTextInput(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/formulaire/formulairedemande/confirmformulaire?text=${encodeURIComponent(textInput)}`);
        closeFormtitle(false);
    };

    return (
        <div className="formtitlewrapper">
            <div className="formtitle">
                <form onSubmit={handleSubmit}>
                    <p>Titre du formulaire</p>
                    <input
                        type='text'
                        id="textInput"
                        value={textInput}
                        onChange={handleTextInputChange}
                        placeholder='titre'
                    />
                   
                    <div className="formtitlebtns">
                        <button onClick={() => closeFormtitle(false)} className="formtitlecancel">Annuler</button>
                        <button type="submit" className="formtitlevalider">Valider</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Formtitle;