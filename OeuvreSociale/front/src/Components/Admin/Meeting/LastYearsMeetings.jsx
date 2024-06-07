import React, { useState, useEffect } from "react";
import '../../../Styles/Addform.css';
import Page_Header from "../bar_menu/Page_Header";
import MeetingEditForm from "../../MeetingEditForm"
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Avatar, IconButton } from "@mui/material";
import { Edit, PictureAsPdf } from "@mui/icons-material"; 



const Addform = () => {
  const { year } = useParams();
    const [meetings, setMeetings] = useState([]);
    const [selectedMeeting, setSelectedMeeting] = useState(null);
    const [showMeetingEditForm, setShowMeetingEditForm] = useState(false);

    const handleMeetingEdit = (meeting) => {
      setSelectedMeeting(meeting);
      setShowMeetingEditForm(true); // Open MeetingEditForm
    };

    useEffect(() => {
      const fetchMeetingsByYear = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/meets`);
          const filteredMeetings = response.data.filter(meeting => new Date(meeting.date).getFullYear() === parseInt(year));
          setMeetings(filteredMeetings);
        } catch (error) {
          console.error("Error fetching meetings by year:", error);
        }
      };
    
      fetchMeetingsByYear();
    }, [year]); // Include year in the dependency array
    

    return (
        <div className="formulsra">

        <Page_Header title="Historique" subtitle="Les réunions des années passées"/>  

            <div className="formulsrapper">
            {meetings.map((meeting) => (
          <div key={meeting.id} className="linkwrapper" onClick={() => handleMeetingEdit(meeting)}>
            <div className="linktodem">{meeting.title}</div>
            <div className="linktodem">{new Date(meeting.date).toLocaleDateString()}</div>
            <div className="linktodem">{meeting.HeurDebut} - {meeting.HeurFin}</div>
                <div>
                  
            <a href={`http://localhost:8000/api/meet-by-year/meet/${meeting._id}/${meeting.files[0]?._id}`} target="_blank" rel="noopener noreferrer">
            <Avatar>
              <PictureAsPdf />
            </Avatar>
          </a>
          </div>
          </div>
        ))}
           
                 
                   {/* ---------------------- static exemple  ----------------
                        <div className="linkwrapper"  >
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
                        {showMeetingEditForm && (
                          <div className='formtitlewrapper'>
                        <MeetingEditForm meeting={selectedMeeting} 
                        onCancel={() => setShowMeetingEditForm(false)}
                        /></div>
                      )}
                    </div>
   
    );
};

export default Addform;

