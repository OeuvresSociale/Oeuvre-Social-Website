// WelcomeSection.jsx
import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import '../../../Pages/Employee/home/home.css';

function WelcomeSection() {
  return (
    <section className="section welcomeSection">
      <Container>
        <Typography variant="h2">Welcome to Our Website!</Typography>
        <Typography>This is the welcome section of our home page.</Typography>
      </Container>
    </section>
  );
}

export default WelcomeSection;
