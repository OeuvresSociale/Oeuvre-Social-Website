import React ,{useState}from "react";
import '../Styles/Motif.css';
import axios from "axios";

const Motif=({closeMotif , handleRedClick ,context, Request,loan})=>{
 
    const handlesendClick= async ()=>{
      if (context === "Loan") {
        // Handle refusal action for Demande page
         try {
           const response = await axios.put(`http://localhost:8000/api/LaonRequest/${loan._id}`, { state:"Rejetée", motif: text, employeeId:loan.employeeId });
            handleRedClick();
            // Close the motif
            closeMotif(false);
        } catch (error) {
           
            console.error('Error sending motif:', error);
        }
      } else if (context === "Demande") {
        // Handle refusal action for Loan page
        try {
          const response = await axios.put(`http://localhost:8000/api/Requests/${Request._id}`, { state:"Rejetée", motif: text });
           handleRedClick();
           // Close the motif
           closeMotif(false);
       } catch (error) {
          
           console.error('Error sending motif:', error);
       }
      }

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