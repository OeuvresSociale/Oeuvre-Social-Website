import React, { useState, useRef , useEffect } from "react";
import '../Styles/Addoffreform.css';
import axios from 'axios';
import { GoTrash } from "react-icons/go";
import { MdOutlineImage } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const Addoffreform = ({ offer }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [image, setImage] = useState( null);
  const [title, setTitle] = useState( '');
  const [startDate, setStartDate] = useState( '');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState( '');

  const [error, setError] = useState(null);

  useEffect(() => {
    if (offer) {
      setImage(offer.image || null);
      setTitle(offer.title || '');
      setStartDate(offer.dateDebut || '');
      setEndDate(offer.dateFin || ''); 
      setDescription(offer.desc || '');
    }
  }, [offer]);

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

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    setError(null);

    try {
      const payload = {
        title,
        startDate, 
        endDate,
        description,
        image
      };

      await axios.put(`/api/offres/${offer._id}`, payload);
      
      navigate('/unvalideoffres');
    } catch (err) {
     
      // setError('Une erreur est survenue lors de la modification.');
    }
  };

  return (
    <div className="addoffrewrapp1">
      <div className="mlbtns2">
        <Link to='/unvalideoffres'>
          <button className="mlrefuse">Annuler</button>
        </Link>
        <button className="mlaccepte" onClick={handleSubmit} >
          Modifier
        </button>
      </div>

      <div className="addoffrewrapp2">
        <div className="ddimg">
          <div>Télécharger une image :</div>
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
                  height: '100%',
                  width: '100%',
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  borderRadius: '7px',
                  fontSize: '100px',
                  color: '#999999',
                  border: 'none',
                  cursor: 'pointer',
                  marginTop: '10px',
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
            style={{ display: 'none' }}
          />
        </div>

        <div className="loaninfst">
          <div className="colloaninft">
            <div className="loaninf">
              <div className="loan1">Titre de l'offre :</div>
              <div className="loan2">
                <input
                  type="text"
                  value={title}
                  onChange={handleInputChange(setTitle)}
                  placeholder="Entrer un titre d'offre"
                />
              </div>
            </div>
            <div className="datesoffre">
              <div style={{ width: '50%' }} className="loaninf">
                <div className="loan1">Date de début :</div>
                <div className="loan2">
                  <input
                    type="date"
                    value={startDate}
                    onChange={handleInputChange(setStartDate)}
                    placeholder="Date de début"
                  />
                </div>
              </div>
              <div style={{ width: '50%' }} className="loaninf">
                <div className="loan1">Date de fin :</div>
                <div className="loan2">
                  <input
                    type="date"
                    value={endDate}
                    onChange={handleInputChange(setEndDate)}
                    placeholder="Date de fin"
                  />
                </div>
              </div>
            </div>
            <div className="loaninf">
              <div className="loan1">Description :</div>
              <div className="loandes2">
                <textarea
                  className="resizable-textarea3"
                  value={description}
                  onChange={handleInputChange(setDescription)}
                  placeholder="Description"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default Addoffreform;