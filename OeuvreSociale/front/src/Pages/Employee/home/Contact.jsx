import React from 'react';
import Header from '../../../Components/Header';
import ContactSection from '../../../Components/Employee/Home/ContactSection';
import Footer from '../../../Components/Employee/Home/Footer';
import Sidebar from '../../../Components/Sidebar';

function Home() {
  return (

   
 

  <div>
  <div className="containeradd">
   <Sidebar />
   <div className="contentadd">
     <Header  />
     <div>
      <Header />
      <ContactSection />
      
    </div>
   </div>
 </div>
</div>   );
}
export default Home;
