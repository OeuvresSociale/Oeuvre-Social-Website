import React ,{useState , useEffect}from "react";
import '../../../Styles/Formuls.css';
import { Link } from 'react-router-dom';
import Page_Header from "../bar_menu/Page_Header";
import axios from "axios";


const Formuls =() =>{

  const [meetingYears, setMeetingYears] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    const fetchMeetings = async () => {
      try {
        const response = await axios.get('https://api.example.com/meetings');
        setMeetingYears(response.data);
      } catch (error) {
        console.error("Error fetching meetings:", error);
      }
    };

    fetchMeetings();
  }, []);
  
return(
<div className="formulsra">

<Page_Header title="Historique" subtitle="Les réunions des années passées"/>   
<div  className="formulsrapper">

{meetingYears.map((meeting) => (




  <Link  to="/reunions/historique/listreunion" className="linkwrapper" key={meetingYears.id}  >
    <div className="linktodem">{meetingYears.name}</div>    

</Link>        ))}

   {/*---------------------- static exemple  ----------------*/}

   <Link  to="/reunions/historique/listreunion" className="linkwrapper" >
  <div className="linktodem"> 2023</div>

    </Link>  
    <Link  to="/reunions/historique/listreunion" className="linkwrapper" >
  <div className="linktodem"> 2022</div>

    </Link>  
    <Link  to="/reunions/historique/listreunion" className="linkwrapper" >
  <div className="linktodem"> 2021</div>

    </Link>  
    
      {/*---------------------- static exemple  ----------------*/}

</div>
</div>
);
};
export default Formuls;