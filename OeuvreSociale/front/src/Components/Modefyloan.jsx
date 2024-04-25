import React , {useState} from "react";
import '../Styles/Modefyloan.css';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';



const Loanform =()=>{
  
        const [editorState, setEditorState] = useState(() =>
            EditorState.createEmpty()
        );
    
        const handleEditorChange = (newEditorState) => {
            setEditorState(newEditorState);
        };
    


    

return (
    <div className="loanformwrapp">
        

          
           
           <div className="empinf">

<div className="loaninfs">
   <div className="colloaninf">
    <div className="loaninf"><div className="loan1">Prix maximal du pret :</div><div className="loan2">2000000000</div></div>
    <div className="loaninf"><div className="loan1">Mois maximal du remboursement :</div><div className="loan2">12</div></div>
    <div className="loaninf"><div className="loan1">Pourcentage maximal à rembourser chaque mois :</div><div className="loan2">30%</div></div>
    
   </div> 
  <div  className="colloaninf2"> 
  <div className="loaninf"><div className="loan1">Description :</div><div className="loandes2"> <Editor
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
            /></div>
  </div>
  </div>
     
     
 
  <div className="bi">
<button className="b11"    >  Annuler </button>
 <button className="b21"     > Supprimer </button>
</div>

   


</div>




</div>

     

</div>


)





}
export default Loanform;