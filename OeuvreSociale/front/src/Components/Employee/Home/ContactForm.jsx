// ContactForm.jsx
import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../../../Pages/Employee/home/home.css';

function ContactForm() {
  return (<  div className='contactus'>
    <Paper elevation={3} className="contactForm">
      <Typography variant="h4" align="center">Contact Us</Typography>
      <form>
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          id="message"
          label="Message"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        <Button variant="contained" color="primary" fullWidth>
          Send
        </Button>
      </form>
    </Paper>
    <div className='contactForm2'>



    </div>
    
    
    
    </div>
  );
}

export default ContactForm;
