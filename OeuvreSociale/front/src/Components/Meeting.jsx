import React, { useState, useEffect } from 'react';
import '../Styles/meeting.css';
import Calendar from 'react-calendar';
import MeetingForm from './MeetingForm'; 
import MeetingEditForm from './MeetingEditForm';
import { Link } from 'react-router-dom';
import Page_Header from './Admin/bar_menu/Page_Header';
import axios from "axios";

// testing
const testMeetings = [
  { id: 1, title: 'Meeting 1', timeStart: '10:00 AM', timeEnd: '11:00 AM', description: 'Discuss project updates', date: new Date() },
  { id: 3, title: 'Meeting 1', timeStart: '10:00 AM', timeEnd: '11:00 AM', description: 'Discuss project updates', date: new Date() },
  { id: 4, title: 'Meeting 1', timeStart: '10:00 AM', timeEnd: '11:00 AM', description: 'Discuss project updates', date: new Date() },

  { id: 2, title: 'Meeting 2', timeStart: '2:00 PM', timeEnd: '3:00 PM', description: 'Brainstorm new ideas', date: new Date() }
];

const GestionDesReunionsPage = () => {
  const [meetings, setMeetings] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [showMeetingForm, setShowMeetingForm] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [showMeetingEditForm, setShowMeetingEditForm] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/meets`, {
          responseType: "json",
          responseEncoding: "utf8",
        }); 
        // const filteredMeetings = response.data.filter(meeting => !meeting.historique); // Exclude meetings with historique set to true
        // setMeetings(filteredMeetings);
        setMeetings(response.data);
        console.log("response:", response);
      } catch (error) {
        console.error("Error fetching requests:", error);
        setError(error);
     
      }
    };

    fetchRequests();
  }, []); // Fetch employees whenever searchValue changes

  useEffect(() => {
    setMeetings(testMeetings); 
  }, []); 

  const handleDayClick = (value) => {
    const today = new Date();
    // Set the time of today to midnight to compare only dates
    today.setHours(0, 0, 0, 0);
    if (value < today) {
      alert("Vous pouvez pas sélécter une date passée");
      setShowMeetingForm(false);
    } else {
      setSelectedDay(value);
      setShowMeetingForm(true);
    }
  };

  const handleMeetingCreate = (meetingData) => {
    //  add new meeting
    const newMeeting = { ...meetingData, id: meetings.length + 1 };
    setMeetings([...meetings, newMeeting]);
    setShowMeetingForm(false); // Close MeetingForm 
  };

  const handleMeetingEdit = (meeting) => {
    setSelectedMeeting(meeting);
    setShowMeetingEditForm(true); // Open MeetingEditForm
    
  };

  const handleMeetingFinish = (meetingId, pdfDoc) => {
    // finishing a meeting
    const updatedMeetings = meetings.map(meeting => {
      if (meeting.id === meetingId) {
        return { ...meeting, finished: true };
      }
      return meeting;
    });
    setMeetings(updatedMeetings);
    setShowMeetingEditForm(false); // Close  MeetingEditForm
  };

  return (
    <div className="gestion-des-reunions-page">
      <Link  to="/reunions/historique"  >
              <button className="btn3">
             Historique
            </button>
            </Link>
      <div className="calendar-container">
        <Calendar onChange={handleDayClick} value={selectedDay} />
      </div>
      <div className="meeting-container">
      <Page_Header title="Réunions" />     
        <div className="meeting-list">
          {meetings.map(meeting => (
            <div key={meeting.id} className="meeting-item" onClick={() => handleMeetingEdit(meeting)}>
              <div>{meeting.title}</div>
             <div>{meeting && new Date(meeting.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}</div>
              <div>{meeting.HeurDebut} - {meeting.HeurFin}</div>
            </div>
          ))}
        </div>
      </div>
      {/* MeetingForm pop-up */}
      {showMeetingForm && (
        <div className='formtitlewrapper'>
      <MeetingForm
        selectedDay={selectedDay}
        onCreateMeeting={handleMeetingCreate}
        onCancel={() => setShowMeetingForm(false)} 
  /></div>
)}

      {/* MeetingEditForm pop-up */}
      {showMeetingEditForm && (
          <div className='formtitlewrapper'>
        <MeetingEditForm meeting={selectedMeeting} onMeetingFinish={handleMeetingFinish} 
        onCancel={() => setShowMeetingEditForm(false)}
         /></div>
      )}
    </div>
  );
};

export default GestionDesReunionsPage;
