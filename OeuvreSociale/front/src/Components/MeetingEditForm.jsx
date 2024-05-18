import React, { useState } from 'react';
import '../Styles/meeting.css';
import { FaFilePdf } from 'react-icons/fa'; // Import PDF file icon

const MeetingEditForm = ({ meeting, onMeetingFinish, onCancel }) => {
  const [pdfDoc, setPdfDoc] = useState('');
  const [pdfFileName, setPdfFileName] = useState(''); // Add state for the PDF file name

  const handleFinishMeeting = () => {
    if (!pdfDoc) {
      alert('Please upload a PDF document');
      return;
    }
    onMeetingFinish(meeting.id, pdfDoc);
    setPdfDoc('');
    setPdfFileName(''); // Clear the file name after finishing the meeting
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPdfDoc(file);
    setPdfFileName(file ? file.name : ''); // Set the file name
  };

  return (
    <div className="meeting-edit-form-popup">
      <h2>Edit Meeting</h2>
      <p>{meeting && meeting.date.toDateString()}</p>
      <p>Title: {meeting && meeting.title}</p>
      <p>Description: {meeting && meeting.description}</p>
      <div className="pdf-input-container">
        <label htmlFor="pdfUpload">
          <FaFilePdf className="pdf-icon" />
          {pdfFileName || 'Upload PV'}
        </label>
        <input type="file" id="pdfUpload" accept=".pdf" onChange={handleFileChange} />
      </div>
      <div className="buttons">
        <button className="valid"onClick={handleFinishMeeting}>Validate</button>
        <button className="cancel" onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default MeetingEditForm;
