import React, { useState, useEffect } from "react";
import '../../../Styles/Formuls.css';
import { Link } from 'react-router-dom';
import Page_Header from "../bar_menu/Page_Header";
import axios from "axios";

const Formuls = () => {
  const [meetingYears, setMeetingYears] = useState([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/meet-by-year');
        setMeetingYears(response.data);
      } catch (error) {
        console.error("Error fetching meetings:", error);
      }
    };

    fetchMeetings();
  }, []);
 {/*---------------------- static exemple  ----------------*/}

//  <Link  to="/reunions/historique/listreunion" className="linkwrapper" >
//  <div className="linktodem"> 2023</div>

//    </Link>  
//    <Link  to="/reunions/historique/listreunion" className="linkwrapper" >
//  <div className="linktodem"> 2022</div>

//    </Link>  
//    <Link  to="/reunions/historique/listreunion" className="linkwrapper" >
//  <div className="linktodem"> 2021</div>

//    </Link>  
   
     {/*---------------------- static exemple  ----------------*/}
  return (
    <div className="formulsra">
      <Page_Header title="Historique" subtitle="Les réunions des années passées"/>
      <div className="formulsrapper">
        {Object.keys(meetingYears).map(year => (
          <Link to={`/reunions/historique/listreunion/${year}`} className="linkwrapper" key={year}>
            <div className="linktodem">{year}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Formuls;
