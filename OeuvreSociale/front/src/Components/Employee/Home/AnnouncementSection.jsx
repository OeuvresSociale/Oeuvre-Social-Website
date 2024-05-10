import '../../../Pages/Employee/home/home.css';
import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import '../../../Pages/Employee/home/home.css';

function AnnouncementSection() {
  return (
    <section className="section announcementSection">
      <Container>
        <Typography variant="h2">Announcements</Typography>
        <Typography>Here you can find the latest announcements.</Typography>
      </Container>
    </section>
  );
}

export default AnnouncementSection;
