import React , {useState} from "react";
import '../Styles/Modefyloan.css';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useLocation } from "react-router-dom"; 
 
const Modefyloan =()=>{
    const [inputText, setInputText] = useState('');
    const [previewWords, setPreviewWords] = useState([]);
    
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const textInputValue = queryParams.get('text') || '';

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
        const handleClick = async (e) => {
            try {
                const formData = {
                    maxAmount: textInputValue,
                    maxMonth: textInputValue,
                    maxPourcentage: textInputValue,
                    desc: textInputValue,
                    // docs: previewWords,
                };
                console.log("formData",formData)
                const response = await axios.post('http://localhost:8000/api/typeLaon', formData);
                console.log('Form confirmed:', response.data);
            
            } catch (error) {
                console.error('Error confirming form:', error);
            
            }
            e.preventDefault();//not refreshing the page 
           
           };

           const handleEditorChange = (newEditorState) => {
            setEditorState(newEditorState);
        };  
         const [editorState, setEditorState] = useState(() =>
            EditorState.createEmpty()
        );   

return (
    <div className="loanformwrapp">
         
           <div className="empinf">

<div className="loaninfs2">
   <div className="colloaninf">
    <div className="loaninf"><div className="loan1">Prix maximal du pret :</div><div className="loan2"><input  type="text"  placeholder="Valeur" />DA</div></div>
    <div className="loaninf"><div className="loan1">Mois maximal du remboursement :</div><div className="loan2"><input  type="text"  placeholder="Valeur" /></div></div>
    <div className="loaninf"><div className="loan1">Pourcentage maximal à rembourser chaque mois :</div><div className="loan2"><input  type="text"  placeholder="Valeur" /></div></div>
    
   </div> 
  <div  className="colloaninf2"> 
  <div className="loaninf"><div className="loan1">Description :</div><div className="loandes2"> <Editor
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
            /></div>
  </div>
  </div>
  </div>
     
 
  <div className="mlbtns">
  <Link to='/formulaire/formulairepret'> <button className="mlrefuse"   >Annuler</button></Link>
            <Link to='/formulaire/formulairepret'> <button className="mlaccepte"   onClick={handleClick} >Créer</button></Link>

           </div> 

</div>

    

</div>
)
}
export default Modefyloan;
    



