import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { MdOutlineImage } from "react-icons/md";
import { GoTrash } from "react-icons/go";
import axios from "axios";

const Addoffreform = () => {
  const [input, setInput] = useState({
    title: "",
    desc: "",
    dateDebut: "",
    dateFin: ""
  });

  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImageUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleImageUpload(file);
  };

  const handleImageUpload = (file) => {
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleDeleteImage = () => {
    setImage(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image); // Append image to FormData
      formData.append("title", input.title);
      formData.append("desc", input.desc);
      formData.append("dateDebut", input.dateDebut);
      formData.append("dateFin", input.dateFin);

      await axios.post("http://localhost:8000/api/offre", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      // Clear form state after successful submission
      setInput({
        title: "",
        desc: "",
        dateDebut: "",
        dateFin: ""
      });
      setImage(null);
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  return (
    <div className="addoffrewrapp1">
      <div className="mlbtns2">
        <Link to="/formulaire/ajouteroffre">
          {" "}
          <button className="mlrefuse">Annuler</button>
        </Link>

        <button className="mlaccepte" onClick={handleClick}>
          Créer
        </button>
      </div>

      <div className="addoffrewrapp2">
        <div className="ddimg">
          <div>Télécharger un image :</div>

          <div
            className="drop-zone"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {image ? (
              <div>
                <div className="deleteimg" onClick={handleDeleteImage}>
                  <GoTrash />
                </div>
                <img
                  src={image}
                  alt="Dropped"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
              </div>
            ) : (
              <button
                onClick={handleButtonClick}
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "rgba(0,0,0,0.2)", // Blue background color
                  borderRadius: "7px",
                  fontSize: "100px",
                  color: "#999999", // Rounded corners
                  border: "none", // No border
                  cursor: "pointer", // Pointer cursor on hover
                  marginTop: "10px" // Space from drop zone
                }}
              >
                <MdOutlineImage />
              </button>
            )}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>

        <div className="loaninfst">
          <div className="colloaninft">
            <div className="loaninf">
              <div className="loan1">Titre de l'offre :</div>
              <div className="loan2">
                <input
                  type="text"
                  name="title"
                  value={input.title}
                  onChange={handleInputChange}
                  placeholder="Entrer un titre d'offre"
                />
              </div>
            </div>
            <div className="datesoffre">
              <div style={{ width: "50%" }} className="loaninf">
                <div className="loan1">Date du début :</div>
                <div className="loan2">
                  <input
                    type="date"
                    name="dateDebut"
                    value={input.dateDebut}
                    onChange={handleInputChange}
                    placeholder="date de recrutement"
                  />
                </div>
              </div>
              <div style={{ width: "50%" }} className="loaninf">
                <div className="loan1">Date du fin :</div>
                <div className="loan2">
                  <input
                    type="date"
                    name="dateFin"
                    value={input.dateFin}
                    onChange={handleInputChange}
                    placeholder="date de recrutement"
                  />
                </div>
              </div>
            </div>

            <div className="loaninf">
              <div className="loan1">Description :</div>
              <div className="loandes2">
                {" "}
                <textarea
                  className="resizable-textarea3"
                  name="desc"
                  value={input.desc}
                  onChange={handleInputChange}
                  placeholder="description"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addoffreform;