import React ,  { useState, useEffect }from "react";
import '../Styles/Offretype.css';
import { Link, useParams } from "react-router-dom";
import { MdOutlineImage } from "react-icons/md";
import Logo from "../Assets/Logo1.png";
import { BsArrowLeftCircle } from "react-icons/bs";
import axios from "axios";

const Offretype =()=>{

    const { id } = useParams(); // Get the offer ID from the URL
    const [offre, setOffre] = useState(null); // State to store offer details
    console.log("id:",id);
    useEffect(() => {
        // Fetch offer details from the backend when the component mounts
        const fetchOffreDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/off/${id}`);
                setOffre(response.data); // Update state with fetched offer details
            } catch (error) {
                console.error("Error fetching offer details:", error);
            }
        };
        fetchOffreDetails();
    }, [id]); // Dependency array includes 'id' to refetch data when ID changes



return (      
           
           <div className="addoffrewrapp11">
            <Link to='/offres'> <div className="arrow"><BsArrowLeftCircle /></div> </Link>
          

<div className="addoffrewrapp25"> 
<div className="ddimg5"> <div>L'image :</div>
{offre && <img src={offre.image} alt="Offer" className='offimg' />}


</div>

<div className="loaninfst5">
   
  

<div className="rowinf">  <div className="gris5">Titre de l'offre :</div>   <div  className="noir">{offre && offre.title}</div> </div>
    <div className="rowinf"> <div className="gris5">Date du début :</div>  <div  className="noir">{offre && offre.dateDebut}</div> </div>
    <div className="rowinf"> <div className="gris5">Date du fin :</div>  <div  className="noir">{offre && offre.dateFin}</div> </div>
    <div className="juspret"> <div className="gris">Description :</div>    <div  className="jpnoir">{offre && offre.desc}</div></div>
 
  
   </div>

</div>
</div>

)

}
export default Offretype;
    


