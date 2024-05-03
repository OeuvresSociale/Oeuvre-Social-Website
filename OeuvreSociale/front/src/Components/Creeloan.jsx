import React , {useState} from "react";
import '../Styles/Modefyloan.css';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { Link } from "react-router-dom";



const Modefyloan =()=>{
  
        const [editorState, setEditorState] = useState(() =>
            EditorState.createEmpty()
        );
    
        const handleEditorChange = (newEditorState) => {
            setEditorState(newEditorState);
        };

        const handleClick = async (e) => {
    
            e.preventDefault();//not refreshing the page 
           
           };

        
    


    

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
    



