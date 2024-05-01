import React, { useState } from "react";
import '../Styles/listForms.css';
import { FaRegFilePdf } from "react-icons/fa6";
import { FaArrowUp } from 'react-icons/fa';

function Forms() {

   // just to test 
  const links = [
    { label: "Type de demande 1", popId: "pop1" },
    { label: "Type de demande 2", popId: "pop2" },
    { label: "Type de demande 3", popId: "pop3" }
  ];

  // just to test 
  const pops = {
    pop1: { 
      title: "Pop 1 Title", 
      numInputs: 3,
      inputTitles: ["Input 1 Title", "Input 2 Title", "Input 3 Title"],
      inputNames: ["input1", "input2", "input3"]
    },
    pop2: { 
      title: "Pop 2 Title", 
      numInputs: 2,
      inputTitles: ["File 1 Title", "File 2 Title"],
      inputNames: ["file1", "file2"]
    },
    pop3: { 
      title: "Pop 3 Title", 
      numInputs: 4,
      inputTitles: ["Document 1 Title", "Document 2 Title", "Document 3 Title", "Document 4 Title"],
      inputNames: ["document1", "document2", "document3", "document4"]
    }
  };

  // User information for testing
  const user = {
    firstName: "Mohammed",
    lastName: "moh"
  };

  const [showPop, setShowPop] = useState(false);
  const [selectedPop, setSelectedPop] = useState(null);

  const handleLinkClick = (popId) => {
    setSelectedPop(popId);
    setShowPop(true);
  };

  const closePop = () => {
    setShowPop(false);
    setSelectedPop(null);
  };
  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    console.log("Uploaded file:", uploadedFile);
  };

  const handleUploadButtonClick = (inputName) => {
    document.getElementsByName(inputName)[0].click();
  };

  return (
    <div className="formsrapper">
      <h2 className="title">Types des demandes</h2>
      {links.map((link, index) => (
        <div key={index} className="linkrapper">
          <div className="linktdem" onClick={() => handleLinkClick(link.popId)}>
            {link.label}
          </div>
        </div>
      ))}
      {showPop && (
        <div className="popModal">
          <div className="popContent">
            <h2 className="poptitle">{pops[selectedPop].title}</h2>
            <div className="userInfo">
              <div className="userInfoItem">
                <div className="userInfoLabel">First Name:</div>
                <div className="userInfoValue">{user.firstName}</div>
              </div>
              <div className="userInfoItem">
                <div className="userInfoLabel">Last Name:</div>
                <div className="userInfoValue">{user.lastName}</div>
              </div>
            </div>
            <ul className="inputList">
              {pops[selectedPop].inputTitles.map((title, index) => (
                <li key={index}>
                  <div className="Label">{title} : </div>
                  <div className="inputWrapper">
                    <FaRegFilePdf className="pdfIcon" />
                    <div className="uploadFile" onClick={() => handleUploadButtonClick(pops[selectedPop].inputNames[index])}>  <FaArrowUp className="icon" /> Upload File </div>
                    <input type="file" accept=".pdf" name={pops[selectedPop].inputNames[index]} onChange={handleFileUpload} />
                  </div>
                </li>
              ))}
            </ul>
            <div className="buttonsWrapper">
              <button className="cancelButton" onClick={closePop}>Cancel</button>
              <button className="validateButton">Validate</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Forms;
