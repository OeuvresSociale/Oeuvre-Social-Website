import React, { useState } from 'react';
import '../Styles/meeting.css';
import axios from "axios";

const MeetingForm = ({ selectedDay, onCreateMeeting, onCancel }) => {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [desc, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateMeeting = async () => {
    if (!title || !startTime || !endTime || !desc) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);

    const meetingData = {
      title,
      HeurDebut: startTime,
      HeurFin: endTime,
      desc,
      date: selectedDay
    };

    try {
      // Make the API call to create the meeting
      const response = await axios.post('http://localhost:8000/api/meet', meetingData);
      console.log('Meeting created:', response.data);

      // Clear the form fields
      setTitle('');
      setStartTime('');
      setEndTime('');
      setDescription('');

      // Alert for successful creation
      alert('Meeting created successfully!');

      // Call the onCreateMeeting prop if provided
      if (onCreateMeeting) {
        onCreateMeeting(response.data);
      }
    } catch (error) {
      console.error('Failed to create meeting:', error);
      alert('Failed to create meeting. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    setTitle('');
    setStartTime('');
    setEndTime('');
    setDescription('');
  };

  return (
    <div className="meeting-form-popup">
      <h2>Nouveau réunion</h2>
      <p>{selectedDay && selectedDay.toDateString()}</p>
      <label>Titre du réunion:</label>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Heure début:</label>
      <input
        type="time"
        placeholder="Start Time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <label>Heure fin:</label>
      <input
        type="time"
        placeholder="End Time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
      <label>Description:</label>
      <textarea
        placeholder="Description"
        value={desc}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="buttons">
        <button onClick={handleCancel} disabled={loading}>
          Annuler
        </button>
        <button className="cancel3" onClick={handleCreateMeeting} disabled={loading}>
          {loading ? 'Creating...' : 'Créer'}
        </button>
      </div>
    </div>
  );
};

export default MeetingForm;
