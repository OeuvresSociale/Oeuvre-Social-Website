import React, { useState, useEffect } from "react";
import '../../../Styles/Addform.css';
import Page_Header from "../bar_menu/Page_Header";
import axios from "axios";




const Addform = () => {
   
    const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    const fetchMeetings = async () => {
      try {
        const response = await axios.get('https://api.example.com/meetings');
        setMeetings(response.data);
      } catch (error) {
        console.error("Error fetching meetings:", error);
      }
    };

    fetchMeetings();
  }, []);
    

    return (
        <div className="formulsra">

        <Page_Header title="Historique" subtitle="Les réunions des années passées"/>  

            <div className="formulsrapper">
            {meetings.map((meeting) => (
          <div key={meeting.id} className="linkwrapper">
            <div className="linktodem">{meeting.title}</div>
            <div className="linktodem">{new Date(meeting.date).toLocaleDateString()}</div>
            <div className="linktodem">{meeting.timeStart} - {meeting.timeEnd}</div>
          </div>
        ))}
           
                 
                   {/*---------------------- static exemple  ----------------*/}
                        <div className="linkwrapper" >
                        <div className="linktodem"> reunion 1 </div><div className="linktodem"> date </div><div className="linktodem">heure </div>
                        </div>
                        <div className="linkwrapper" >
                        <div className="linktodem">reunion2</div>
                        </div>
                        <div className="linkwrapper" >
                        <div className="linktodem"> reunion3</div>
                        </div>
                        
                       {/*---------------------- static exemple  ----------------*/}
                       
                    
                        </div>
                       
            </div>
           
       
    );
};

export default Addform;

