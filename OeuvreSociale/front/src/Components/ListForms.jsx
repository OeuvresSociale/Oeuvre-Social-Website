import React, { useState } from "react";
import '../Styles/listForms.css';
import { FaRegFilePdf } from "react-icons/fa";
import { FaArrowUp } from 'react-icons/fa';
import Addloandemande from "./Addloandemande";

function Forms() {
  const [formData, setFormData] = useState({
    file: null,
  });
  const links = [
    { label: "Type de demande 1", popId: "pop1" },
    { label: "Type de demande 2", popId: "pop2" },
    { label: "Type de demande 3", popId: "pop3" }
  ];
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
  const user = {
    firstName: "Mohammed",
    lastName: "moh"
  };

  // pop-up visibility
  const [showPop, setShowPop] = useState(false);
  const [showPop2, setShowPop2] = useState(false);
  const [selectedPop, setSelectedPop] = useState(null);
  const [files, setFiles] = useState({});

  // handle link clicks
  const handleLinkClick = (popId) => {
    setSelectedPop(popId);
    setShowPop(true);
  };

  // close the pop-up
  const closePop = () => {
    setFiles({});
    setShowPop(false);
    setSelectedPop(null);
  };

  // handle file upload
  const handleFileUpload = (event, inputName) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      console.log("Uploaded file:", uploadedFile.name);
      setFiles(prevState => ({
        ...prevState,
        [inputName]: uploadedFile.name
      }));
    }
  };

  // upload button click
  const handleUploadButtonClick = (inputName) => {
    document.getElementsByName(inputName)[0].click();
  };

  // handle form submission
  const handleFormSubmit = () => {
    console.log("Form Data:", formData);
    console.log("Files:", files);
    setFormData({
      file: null,
    });
    setFiles({});
    setShowPop(false);
    setSelectedPop(null);
  };

  return (
    <div className="formsrapper">
      <h2 className="title">Types des demandes</h2>
      <div className="linkrapper" onClick={() => { setShowPop2(true); }}>
          <div className="linktdem"  >
            Demander pret 
          </div>
        </div>
      {links.map((link, index) => (
        <div key={index} className="linkrapper" onClick={() => handleLinkClick(link.popId)}>
          <div className="linktdem">{link.label}</div>
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
                  <div className="Label">{title}:</div>
                  <div className="inputWrapper" onClick={() => handleUploadButtonClick(pops[selectedPop].inputNames[index])}>
                    <FaRegFilePdf className="pdfIcon" />
                    <span className="name">
                      {files[pops[selectedPop].inputNames[index]] || "Upload File"}
                    </span>
                    <div className="uploadFile">
                      <span>Choose File</span>
                      <input type="file" accept=".pdf" name={pops[selectedPop].inputNames[index]} onChange={(event) => handleFileUpload(event, pops[selectedPop].inputNames[index])} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="buttonsWrapper">
              <button className="cancelButton" onClick={closePop}>Cancel</button>
              <button className="validateButton" onClick={handleFormSubmit}>Validate</button>
            </div>
          </div>
        </div>
      )}
       {showPop2 && <Addloandemande closeit={setShowPop2}  />}
    </div>
  );
}

export default Forms;
