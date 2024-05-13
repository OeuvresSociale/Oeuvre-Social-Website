import React , {useState} from "react";
import '../Styles/Modefyloan.css';
import { Link } from "react-router-dom";
import axios from "axios";



const Modefyloan =()=>{


  const [formData, setFormData] = useState({
    maxAmount: '',
    maxMonth: '',
    maxPourcentage: '',
    desc: ''
});

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('/your-backend-endpoint', formData);
        // Handle success, maybe redirect or show a success message
        console.log(response.data); // Log the response data
    } catch (error) {
        console.error('There was a problem with your Axios request:', error);
        // Handle errors, maybe show an error message to the user
    }
};


  
       
     
         

return (
    <div className="loanformwrapp">
        

          
           
        

<div className="loaninfs2">
   <div className="colloaninf">
    <div className="loaninf"><div className="loan1">Prix maximal du pret :</div><div className="loan2"><input  type="text"  placeholder="Valeur"    name="maxLoanPrice"
                                value={formData.maxAmount}
                                onChange={handleChange}/>DA</div></div>
    <div className="loaninf"><div className="loan1">Mois maximal du remboursement :</div><div className="loan2"><input  type="text"  placeholder="Valeur" value={formData.maxMonth}
                                onChange={handleChange} /></div></div>
    <div className="loaninf"><div className="loan1">Pourcentage maximal à rembourser chaque mois :</div><div className="loan2"><input  type="text"  placeholder="Valeur" value={formData.maxPourcentage}
                                onChange={handleChange}/></div></div>
    
   </div> 
  <div  className="colloaninf2"> 
  <div className="loaninf"><div className="loan1">Description :</div><div className="loandes2"> <textarea
     className="resizable-textarea2"
     name="description"
      value={formData.desc}
      onChange={handleChange}
      placeholder="description"
    ></textarea></div>
  </div>
  </div>
  </div>
     
 
  <div className="mlbtns">
  <Link to='/formulaire/formulairepret'> <button className="mlrefuse"   >Annuler</button></Link>
            <Link to='/formulaire/formulairepret'> <button className="mlaccepte"   onClick={handleSubmit} >Créer</button></Link>




       

   


</div>






     

</div>


)





}
export default Modefyloan;
    



