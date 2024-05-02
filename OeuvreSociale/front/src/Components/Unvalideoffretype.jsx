import React , {useState ,  useRef }from "react";
import '../Styles/Addoffreform.css';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { Link } from "react-router-dom";
import { MdOutlineImage } from "react-icons/md";




const Addoffreform =()=>{
  
        const [editorState, setEditorState] = useState(() =>
            EditorState.createEmpty()
        );
    
        const handleEditorChange = (newEditorState) => {
            setEditorState(newEditorState);
        };

        const handleClick = async (e) => {
    
          e.preventDefault();//not refreshing the page 
         
         };

        const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImageUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleImageUpload(file);
  };

  const handleImageUpload = (file) => {
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

return (
    
       
           
           <div className="addoffrewrapp1">
           <div className="mlbtns2">
  <Link to='/formulaire/ajouteroffre'> <button className="mlrefuse"   >Annuler</button></Link>
            <Link to='/formulaire/ajouteroffre'> <button className="mlaccepte"   onClick={handleClick} >Modifier</button></Link>
         </div> 

<div className="addoffrewrapp2"> 
<div className="ddimg"> <div>Télécharger un image :</div>


      <div
        className="drop-zone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {image ? (
          <img src={image} alt="Dropped" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
            <button onClick={handleButtonClick}
            style={{
              height:'100%',
              width:'100%',
              backgroundColor: 'rgba(0,0,0,0.2)', // Blue background color
              borderRadius: '7px',
              fontSize :'100px',
              color:'#999999',// Rounded corners
              border: 'none', // No border
              cursor: 'pointer', // Pointer cursor on hover
              marginTop: '10px', // Space from drop zone
            }}><MdOutlineImage /></button>
        )}
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    
      
    </div>

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
    