// ContactForm.jsx
import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../../../Pages/Employee/home/home.css';
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";
import Page_Header from '../../Admin/bar_menu/Page_Header';

function ContactForm() {
  return (<div >
    <Page_Header title="Contactez nous" subtitle="vous pouvez envoyer des messages à l'administration"/> 
    < div className='contactus'>
     <div className='contactForm2'>

    <div className='emailos'><MdEmail /> Email</div>
    <div>oeuvresSocial@gmail.com</div>
   <div className='emailos'> <FaPhoneAlt /> Numéro de téléphone</div>
   <div>+213 69999999999</div>
    <div className='emailos'><SiGooglemaps /> Addresse</div>
    <div>El wiaam-Sidi bel abbes</div>

    </div>

    <div className="contactForm">
      <Typography variant="h4" align="center">Contactez nous</Typography>
      <form>
        <TextField
          id="name"
          label="Nom"
          variant="outlined"
          fullWidth
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
          id="email"
          label="Titre"
          variant="outlined"
          fullWidth
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
        <Button variant="contained"  sx={{
            backgroundColor: '#148582',
            '&:hover': {
              backgroundColor: '#148582',
            },
          }} fullWidth>
          Envoyer
        </Button>
      </form>
    </div>
    
    
    
    </div></div>
  );
}

export default ContactForm;
