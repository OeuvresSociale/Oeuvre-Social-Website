// ContactSection.jsx
import React from 'react';
import Container from '@mui/material/Container';
import ContactForm from './ContactForm';
import '../../../Pages/Employee/home/Contact.css';
import Footer from './Footer'

function ContactSection() {
  return (
    <section className="contactSectionwrap">
      <Container>
        <ContactForm />
        
      </Container>
    </section>
  );
}

export default ContactSection;
