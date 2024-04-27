import React , {useState} from "react";
import '../Styles/Addloandemande.css';

const Addloandemande =()=>{

    const [text, setText] = useState(''); // State to store textarea content

    const handleInputChange = (event) => {
      setText(event.target.value);
    };

return (
    <div className="addloandemande">
        <div className="addloandemwrapp">
        <div className="firstbleu">
            <div className="firstbleu1"> Formulaire de pret   </div>
            <div className="firstbleu2"> Le formulaire de prêt pour les œuvres sociales est un outil important pour les employés qui ont besoin d'une assistance
                 financière temporaire, permettant à l'organisation à vocation sociale de prendre des décisions éclairées et de fournir un
                  soutien financier approprié à ses membres.</div>
        </div>
        <div>
        <div className="firstwhite">
    <div className="loaninf"><div className="loan1">Prix maximal du pret :</div><div className="loan4"><input  type="text"  placeholder="Valeur" />DA</div></div>
    <div className="loaninf"><div className="loan1">Mois maximal du remboursement :</div><div className="loan4"><input  type="text"  placeholder="Valeur" /></div></div>
    <div className="loaninf"><div className="loan1">Justifier la besion du pret :</div><div className="loan3"><textarea
      className="restextarea" // Apply resizable-textarea class for styling
      value={text}
      onChange={handleInputChange}
      placeholder="Motif "
    ></textarea></div></div>
    
   </div> 
        </div>
        <div className="aldb">
<button className="b1"   >  Annuler </button>
 <button className="b2"    > Valider </button>
</div>
     
</div>
</div>


)





}
export default Addloandemande;