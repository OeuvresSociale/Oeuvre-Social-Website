import React, { useState } from "react";
import "../Styles/Formtitle.css";
import { Link } from "react-router-dom";

const ModefyFormtitle = ({ closeFormtitle }) => {
  const [textInput, setTextInput] = useState("");
  const [textInputprix, setTextInputprix] = useState("");

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleTextInputprixChange = (event) => {
    setTextInputprix(event.target.value);
  };
  const handleClick = async (e) => {
    e.preventDefault(); //not refreshing the page
    closeFormtitle(false);
  };

  return (
    <div className="formtitlewrapper">
      <div className="formtitle">
        <form>
          <p> Modifier titre du formulaire</p>
          <input
            type="text"
            id="textInput"
            value={textInput}
            onChange={handleTextInputChange}
            placeholder="titre"
          />
          <input
            type="text"
            id="textInputprix"
            value={textInputprix}
            onChange={handleTextInputprixChange}
            placeholder="Prix"
          />

          <div className="formtitlebtns">
            <button
              onClick={() => closeFormtitle(false)}
              className="formtitlecancel"
            >
              Annuler
            </button>
            <button onClick={handleClick} className="formtitlevalider">
              Valider
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModefyFormtitle;
