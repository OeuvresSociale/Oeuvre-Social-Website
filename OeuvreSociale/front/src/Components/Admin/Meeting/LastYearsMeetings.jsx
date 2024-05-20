import React, { useState, useEffect } from "react";
import '../../../Styles/Addform.css';
import Page_Header from "../bar_menu/Page_Header";
import MeetingEditForm from "../../MeetingEditForm"
import axios from "axios";




const Addform = () => {
 
    const [meetings, setMeetings] = useState([]);
    const [selectedMeeting, setSelectedMeeting] = useState(null);
    const [showMeetingEditForm, setShowMeetingEditForm] = useState(false);

    const handleMeetingEdit = (meeting) => {
      setSelectedMeeting(meeting);
      setShowMeetingEditForm(true); // Open MeetingEditForm
    };

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
          <div key={meeting.id} className="linkwrapper" onClick={() => handleMeetingEdit(meeting)}>
            <div className="linktodem">{meeting.title}</div>
            <div className="linktodem">{new Date(meeting.date).toLocaleDateString()}</div>
            <div className="linktodem">{meeting.timeStart} - {meeting.timeEnd}</div>
          </div>
        ))}
           
                 
                   {/*---------------------- static exemple  ----------------*/}
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

