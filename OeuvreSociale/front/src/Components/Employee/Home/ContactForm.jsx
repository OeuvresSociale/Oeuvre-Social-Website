// ContactForm.jsx
import React , { useState } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../../../Pages/Employee/home/Contact.css';
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";
import Page_Header from '../../Admin/bar_menu/Page_Header';

function ContactForm() {

  const [formData, setFormData] = useState({
    name: '',
    title: '',
    message: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/receiveEmail', formData);
      alert("email envoyé avec succès!");
    } catch (error) {
      alert("Erreur lors de l\'envoi du email.");
    }
  };


  return (<div className='cur'>
    <Page_Header title="Contactez nous" subtitle="vous pouvez envoyer des messages à l'administration"/> 
    < div className='contactus'>
     <div className='contactForm2'>
     <Typography variant="h4" align="left">Contactez nous sur :</Typography>
    <div className='emailos'><MdEmail /> Email</div>
    <div>oeuvresSocial@gmail.com</div>
   <div className='emailos'> <FaPhoneAlt /> Numéro de téléphone</div>
   <div>+213 69999999999</div>
    <div className='emailos'><SiGooglemaps /> Addresse</div>
    <div>El wiaam-Sidi bel abbes</div>

    </div>

    <div className="contactForm">
      
      <form onSubmit={handleSubmit}>
        <TextField
          id="name"
          label="Nom"
          variant="outlined"
          fullWidth
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#00194F', // Default border color
              },
              '&:hover fieldset': {
                borderColor: '#00194F', // Hover border color
              },
              '&.Mui-focused fieldset': {
                borderColor: '#00194F', // Focused border color
              },},
              '& .MuiInputLabel-root': {
                color: '', // Default label color
                '&:hover': {
                  color: '##00194F', // Hover label color
                },
                '&.Mui-focused': {
                  color: '#00194F', // Focused label color
                },
              },
            
          }}
        />
        <TextField
          id="title"
          label="Titre"
          variant="outlined"
          fullWidth
          value={formData.title}
          onChange={handleChange}
          margin="normal"
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#00194F', // Default border color
              },
              '&:hover fieldset': {
                borderColor: '#00194F', // Hover border color
              },
              '&.Mui-focused fieldset': {
                borderColor: '#00194F', // Focused border color
              },},
              '& .MuiInputLabel-root': {
                color: '', // Default label color
                '&:hover': {
                  color: '#00194F', // Hover label color
                },
                '&.Mui-focused': {
                  color: '#00194F', // Focused label color
                },
              },
            
          }}
        />
        <TextField
          id="message"
          label="Message"
          variant="outlined"
          fullWidth
          multiline
          value={formData.message}
          onChange={handleChange}
          rows={4}
          margin="normal"
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#00194F', // Default border color
              },
              '&:hover fieldset': {
                borderColor: '#00194F', // Hover border color
              },
              '&.Mui-focused fieldset': {
                borderColor: '#00194F', // Focused border color
              },},
              '& .MuiInputLabel-root': {
                color: '', // Default label color
                '&:hover': {
                  color: '#00194F', // Hover label color
                },
                '&.Mui-focused': {
                  color: '#00194F', // Focused label color
                },
              },
            
          }}
        />
        <Button variant="contained" type="submit"
            sx={{
            backgroundColor: '#148582',
            '&:hover': {
              backgroundColor: '#148582',
            },
          }} >
          Envoyer
        </Button>
      </form>
     
    </div>
    
    
    
    </div></div>
  );
}

export default ContactForm;
