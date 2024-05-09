import React , {useState} from "react";
import '../Styles/Loanform.css';
import { BsArrowLeftCircle } from "react-icons/bs";
import { Link } from "react-router-dom";


const Loanform =()=>{
  const [loan, setRequest] = useState({
    _id: "",
  
  employeeId: {
    _id: "",
    idEmployee: "",
    familyName: "",
    firstName: "",
    email: "",
    phoneNumber: "",
    monthlySalary: "",
    familysitution: "",
  },
  amount:"",
  duration:"",
  purpose:"",
  desc:"",
});

// useEffect(()=>{
//   setInput(prevInputs=>({
//   ...prevInputs
//   }));
// },[]);
// const [err, setErr]=useState(null);
// const handleClick = async (e) => {
//   e.preventDefault();//not refreshing the page 
//  try{  
//    await axios.post("http://localhost:8000/api/offre",input); 
//  }
//  catch(error){
//  setErr(error.response.data);
//  }
// };


 const handleClick = async (e) => {

   e.preventDefault();//not refreshing the page 
 
  };




    

return (
    <div className="loanformwrapp">
        <Link to='/formulaire/formulairepret/modifierpret'> <div > <div  className="modefypret">
                <button onClick={handleClick}>Modifier</button>
              
            </div></div></Link>

          <Link to='/formulaire'> <div className="arrow"><BsArrowLeftCircle /></div> </Link>
           
           <div className="empinf">

<div className="loaninfs">
   <div className="colloaninf">
    <div className="loaninf"><div className="loan1">Prix maximal du pret :</div><div className="loan2">{loan.amount}</div></div>
    <div className="loaninf"><div className="loan1">Mois maximal du remboursement :</div><div className="loan2">{loan.duration}</div></div>
    <div className="loaninf"><div className="loan1">Pourcentage maximal à rembourser chaque mois :</div><div className="loan2">30%</div></div>
    
   </div> 
  <div  className="colloaninf2"> 
  <div className="loaninf"><div className="loan1">Description :</div><div className="loandes">{loan.desc}</div>
  </div>
     
  </div> 

   


</div>




</div>

     

</div>


)





}
export default Loanform;