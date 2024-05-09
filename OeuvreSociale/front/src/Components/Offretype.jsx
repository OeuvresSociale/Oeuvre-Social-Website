import React , {useState ,  useRef }from "react";
import '../Styles/Offretype.css';
import { Link } from "react-router-dom";
import { MdOutlineImage } from "react-icons/md";
import Logo from "../Assets/Logo1.png";
import { BsArrowLeftCircle } from "react-icons/bs";

const Offretype =()=>{

    const [offre, setRequest] = useState({
       title:"",
       dateDebut:"",
       dateFin:"",
       desc:"",

      });


    //   useEffect(() => {
    //     const fetchRequestDetails = async () => {
    //       try {
    //         const response = await axios.get(
    //           `http://localhost:8000/api/Request/${id}`
    //         );
    
    //         setRequest(response.data);
    //         // Assuming data is an object containing details of the selected employee
    //       } catch (error) {
    //         alert(error.response.data);
    //         console.error("Error fetching request details:", error);
    //       }
    //     };
    //     fetchRequestDetails();
    //   }, []);
 
return (      
           
           <div className="addoffrewrapp11">
            <Link to='/formulaire/ajouteroffre'> <div className="arrow"><BsArrowLeftCircle /></div> </Link>
          

<div className="addoffrewrapp25"> 
<div className="ddimg5"> <div>L'image :</div>
<img src={Logo} alt="logo" className='offimg'  />


</div>

<div className="loaninfst5">
   
  

<div className="rowinf">  <div className="gris5">Titre de l'offre :</div>   <div  className="noir">{offre.title}</div> </div>
    <div className="rowinf"> <div className="gris5">Date du début :</div>  <div  className="noir">{offre.datedebut}</div> </div>
    <div className="rowinf"> <div className="gris5">Date du fin :</div>  <div  className="noir">{offre.datefin}</div> </div>
    <div className="juspret"> <div className="gris">Description :</div>    <div  className="jpnoir">{offre.desc}</div></div>
 
  
   </div>

</div>
</div>

)

}
export default Offretype;
    


