import React, { useState } from 'react';
import '../Styles/meeting.css';

const MeetingForm = ({ selectedDay, onCreateMeeting, onCancel }) => {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateMeeting = async () => {
    if (!title || !startTime || !endTime || !description) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);

    const meetingData = {
      title,
      timeStart: startTime,
      timeEnd: endTime,
      description,
      date: selectedDay
    };

    try {
      await onCreateMeeting(meetingData);
      setTitle('');
      setStartTime('');
      setEndTime('');
      setDescription('');
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
      <h2>New Meeting</h2>
      <p>{selectedDay && selectedDay.toDateString()}</p>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="Start Time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
      <input type="text" placeholder="End Time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <div className="buttons">
        <button onClick={handleCreateMeeting} disabled={loading}>
          {loading ? 'Creating...' : 'Create'}
        </button>
        <button className="cancel" onClick={handleCancel} disabled={loading}>Cancel</button>
      </div>
    </div>
  );
};

export default MeetingForm;
