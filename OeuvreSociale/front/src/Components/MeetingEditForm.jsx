import React, { useState } from 'react';
import '../Styles/meeting.css';
import { FaFilePdf } from 'react-icons/fa';
import axios from "axios";

const MeetingEditForm = ({ meeting, onMeetingFinish, onCancel }) => {
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pdfFileName, setPdfFileName] = useState('');

  const handleFinishMeeting = async () => {

      console.log('handleFinishMeeting called above');
   
    
    
    if (!pdfDoc) {
      alert('Please upload a PDF document');
      return;
    }
    console.log('handleFinishMeeting called bellow');
    const formData = new FormData();
    formData.append('pdfDoc', pdfDoc);

    try {
      const response = await axios.put(`http://localhost:8000/api/addPv/${meeting._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('PV added:', response.data);
      alert('PV added successfully!');
      onMeetingFinish(response.data);
    } catch (error) {
      console.error('Failed to update meeting:', error);
      alert('Failed to update meeting. Please try again.');
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPdfDoc(file);
    setPdfFileName(file ? file.name : '');
  };

  return (
    <div className="meeting-edit-form-popup">
      <h2> Réunion</h2>
      <p>{meeting && new Date(meeting.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}</p>
      <p>Titre: {meeting && meeting.title}</p>
      <p>Description: {meeting && meeting.desc}</p>
      <div className="pdf-input-container">
        <label htmlFor="pdfUpload">
          <FaFilePdf className="pdf-icon" />
          {pdfFileName || 'télécharger PV'}
        </label>
        <input type="file" id="pdfUpload" accept=".pdf" onChange={handleFileChange} />
      </div>
      <div className="buttons">
        <button className="cancel3" onClick={handleCancel}>Annuler</button>
        <button className="valid" onClick={handleFinishMeeting}>Valider</button>
      </div>
    </div>
  );
};

export default MeetingEditForm;
