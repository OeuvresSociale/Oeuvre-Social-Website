import React ,{useState}from "react";
import '../Styles/Motif.css';


const Motif=({closeMotif , handleRedClick})=>{

    const handlesendClick=()=>{
        handleRedClick();
        closeMotif(false)
      
       };

       const [text, setText] = useState(''); // State to store textarea content

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

    
return(
    <div className="motifwrapper">
<div  className="motif">
   <p>Motif de refus</p>
   <textarea
      className="resizable-textarea" // Apply resizable-textarea class for styling
      value={text}
      onChange={handleInputChange}
      placeholder="Motif de refuse"
    ></textarea>
   <div className="motifbtns">
      <button onClick={  ()=> closeMotif(false)}  className="motifcancel">Annuler</button>
       <button onClick={ handlesendClick}  className="motifenvoyer">Envoyer</button>

    </div>

    </div>
</div>
);



};
export default Motif;