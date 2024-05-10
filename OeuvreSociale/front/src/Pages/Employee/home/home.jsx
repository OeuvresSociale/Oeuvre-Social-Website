import React from 'react';
import HeaderUser from '../../../Components/HeaderUser';
import WelcomeSection from '../../../Components/Employee/Home/WelcomeSection';
import AnnouncementSection from '../../../Components/Employee/Home/AnnouncementSection';
import ContactSection from '../../../Components/Employee/Home/ContactSection';
import Footer from '../../../Components/Employee/Home/Footer';

function Home() {
  return (
    <div>
      <HeaderUser />
      <WelcomeSection />
      <AnnouncementSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
export default Home;
