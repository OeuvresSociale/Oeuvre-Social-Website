import React, { useState, useEffect } from 'react';
import '../Styles/meeting.css';
import Calendar from 'react-calendar';
import MeetingForm from './reunionForm'; 
import MeetingEditForm from './reunionEditForm';

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

  useEffect(() => {
    setMeetings(testMeetings); 
  }, []);

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setShowMeetingForm(true); // Open MeetingForm 
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
      <div className="calendar-container">
        <Calendar onChange={handleDayClick} value={selectedDay} />
      </div>
      <div className="meeting-container">
        <h2 className="met">Meetings</h2>
        <div className="meeting-list">
          {meetings.map(meeting => (
            <div key={meeting.id} className="meeting-item" onClick={() => handleMeetingEdit(meeting)}>
              <div>{meeting.title}</div>
              <div>{meeting.timeStart} - {meeting.timeEnd}</div>
            </div>
          ))}
        </div>
      </div>
      {/* MeetingForm pop-up */}
      {showMeetingForm && (
      <MeetingForm
        selectedDay={selectedDay}
        onCreateMeeting={handleMeetingCreate}
        onCancel={() => setShowMeetingForm(false)} 
  />
)}

      {/* MeetingEditForm pop-up */}
      {showMeetingEditForm && (
        <MeetingEditForm meeting={selectedMeeting} onMeetingFinish={handleMeetingFinish} 
        onCancel={() => setShowMeetingEditForm(false)}
         />
      )}
    </div>
  );
};

export default GestionDesReunionsPage;
