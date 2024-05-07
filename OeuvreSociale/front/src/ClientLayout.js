import React from 'react';
import ClientSidebar from './ClientSidebar';
import ClientNavbar from './ClientNavbar';
import './client.css'; // Client-specific CSS

const ClientLayout = ({ children }) => {
  return (
    <div className="client-container">
      <ClientSidebar />
      <div className="client-content">
        <ClientNavbar />
        {children}
      </div>
    </div>
  );
};

export default ClientLayout;