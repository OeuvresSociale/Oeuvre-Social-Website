// ContactSection.jsx
import React from 'react';
import Container from '@mui/material/Container';
import ContactForm from './ContactForm';
import '../../../Pages/Employee/home/home.css';

function ContactSection() {
  return (
    <section className="section contactSection">
      <Container>
        <ContactForm />
      </Container>
    </section>
  );
}

export default ContactSection;
