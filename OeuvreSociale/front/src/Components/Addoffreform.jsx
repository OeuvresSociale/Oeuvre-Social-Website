import React , {useState} from "react";
import '../Styles/Addoffreform.css';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { Link } from "react-router-dom";




const Addoffreform =()=>{
  
        const [editorState, setEditorState] = useState(() =>
            EditorState.createEmpty()
        );
    
        const handleEditorChange = (newEditorState) => {
            setEditorState(newEditorState);
        };

return (
    
       
           
           <div className="addoffrewrapp1">
           <div className="mlbtns2">
  <Link to='/formulaire/ajouteroffre'> <button className="mlrefuse"   >Annuler</button></Link>
            <Link to='/formulaire/ajouteroffre'> <button className="mlaccepte"   >Créer</button></Link>
         </div> 

<div className="addoffrewrapp2"> 
<div className="ddimg"> Télécharger un image :</div>

<div className="loaninfst">
   <div className="colloaninft">
    <div className="loaninf"><div className="loan1">Titre de l'offre :</div><div className="loan2"><input  type="text"  placeholder="Entrer un titre d'offre" /></div></div>
   <div className="datesoffre"> <div style={{ width: '50%' }} className="loaninf"><div className="loan1">Date du début :</div><div  className="loan2"><input   type="date" name="dateStartJob" placeholder="date de recrutement" /></div></div>
    <div style={{ width: '50%' }} className="loaninf"><div  className="loan1">Date du fin :</div><div className="loan2"><input   type="date" name="dateStartJob" placeholder="date de recrutement" /></div></div>
    </div>
    
 
  <div className="loaninf"><div className="loan1">Description :</div><div className="loandes2"> <Editor
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
            /></div>
  </div>
  </div>
   </div>




</div>
</div>



)

}
export default Addoffreform;
    




