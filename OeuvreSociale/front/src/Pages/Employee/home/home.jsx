import React from 'react';
import Header from '../../../Components/Header';
import WelcomeSection from '../../../Components/Employee/Home/WelcomeSection';
import AnnouncementSection from '../../../Components/Employee/Home/AnnouncementSection';
import ContactSection from '../../../Components/Employee/Home/ContactSection';
import Footer from '../../../Components/Employee/Home/Footer';
import SidebarEmployee from '../../../Components/SidebarEmployee';

function Home() {
  return (

   
 

  <div>
  <div className="containerf">
   <SidebarEmployee />
   <div className="contentf">
     <Header  />
     <div>
      <Header />
      <WelcomeSection />
      <AnnouncementSection />
      <ContactSection />
      <Footer />
    </div>
   </div>
 </div>
</div>   );
}
export default Home;
