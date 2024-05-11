import React, { useState, useEffect } from 'react';
import '../Styles/arch.css';

const ArchivePage = () => {
  const [activeYear, setActiveYear] = useState(2024); 
  const [activeMonth, setActiveMonth] = useState('January'); 
  const [selectedSection, setSelectedSection] = useState('all');
  const [showAddPV, setShowAddPV] = useState(false);
  const [Offres, setOffres] = useState([]);
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Document 1', month: 'January', year: 2023, section: 'pvs' },
  ]);
  const handleYearChange = (year) => {
    setActiveYear(year);
  };
  const handleMonthChange = (month) => {
    setActiveMonth(month);
    
  };
  useEffect(() => {
    // Fetch offres from database
    const dummyOffres = [
      { id: 1, name: 'Offre 1', description: 'Description of Offre 1', month: 'January', year: 2023 },
      { id: 2, name: 'Offre 2', description: 'Description of Offre 2', month: 'February', year: 2023 },
    ];
    setOffres(dummyOffres);
  }, []);

  //adding a PV
     const handleAddPV = (name, description, file) => {
    const newPV = { id: documents.length + 1, name, description, month: activeMonth, year: activeYear, section: 'pvs' };
    setDocuments([...documents, newPV]);
    setShowAddPV(false);
    console.log(`Adding PV: Name - ${name}, Description - ${description}, File - ${file}`);
  };

  const handleDownload = (document) => {
    //downloading a document
    console.log(`Downloading ${document.name}`);
  };
  const handleDelete = (document) => {
    //downloading a document
    console.log(`Deleting ${document.name}`);
  };

  // filter docs 
  const filteredDocuments = documents.filter(doc => {
    if (selectedSection !== 'all' && doc.section !== selectedSection) {
      return false;
    }
    if (activeMonth && doc.month !== activeMonth) { 
      return false;
    }
    if (doc.year !== activeYear) {
      return false;
    }
    return true;
  });



  // Rendered JSX
  return (
    <div className="archive-page">
 
          <div className="first">

     {/* Section1:Buttons */}
    <div className="actions">
    <button onClick={handleAddPV}>+ Add PV</button>
    <button onClick={handleDelete}>Delete</button>
    <button onClick={handleDownload}>Download</button>
    </div>
</div>

      
      <div className="bleuu">

      {/* Section 1: Years */}
      <div className="years-section">
        <button onClick={() => setActiveYear(activeYear - 1)}>&lt;</button>
        <span>{activeYear}</span>
        <button onClick={() => setActiveYear(activeYear + 1)}>&gt;</button>
      </div>

     {/* Section 2: Months */}
      <div className="month-selection">
      {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
      <span 
      key={month} 
      className={activeMonth === month ? 'selected' : ''}
      onClick={() => handleMonthChange(month)}
      >
      {month}
      </span>
  ))}
</div>

      
        {/* List of Offres */}
        <div className="menu-section">

        <div className="documents-list">
          {filteredDocuments.map(doc => (
            <div key={doc.id} className="document">
              <span>{doc.name}</span>
              <button onClick={() => handleDownload(doc)}>Download</button>
            </div>
          ))}
        </div>
      </div>

       {/* Section2:filter */}
    <div className="menu-section">
    <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
    <option value="all">All</option>
    <option value="pvs">PVs</option>
    <option value="offres">Offres</option>
    </select>
    </div>
    </div>

      {/* Popups for adding PVs */}
      {showAddPV && (
        <div className="popup">
          {/* Logic for adding PV popup */}
          <input type="text" placeholder="Name" />
          <textarea placeholder="Description"></textarea>
          <input type="file" />
          <button onClick={() => handleAddPV(/* pass form values here */)}>Add PV</button>
        </div>
      )}
    </div>
  );
};

export default ArchivePage;
