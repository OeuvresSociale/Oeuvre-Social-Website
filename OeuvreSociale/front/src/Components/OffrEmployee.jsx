import React from 'react';
import '../Styles/offrEmployee.css';
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import pic1 from "../Assets/pic1.jpg"
import pic3 from "../Assets/pic3.jpg"
import pic4 from "../Assets/pic4.jpg"
import images from "../Assets/images.png"
import pic6 from "../Assets/pic6.jpg"


const Card = ({ title, description, images }) => {
  return (
    <div className="card" onClick={() => handleCardClick()}>
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="image-container">
        {images.map((image, index) => (
          <img key={index} src={image} />
        ))}
      </div>
    </div>
  );
};

const handleCardClick = () => {
  // Navigate to another page
};

const OffrEmployee= () => {
  return (
   <div>
    <div className="go-back" onClick={() => handleGoBackClick()}>
        <FaRegArrowAltCircleLeft size={40}/>
      </div>
    <div className="containeer">
        {cardData.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            images={card.images}
          />
        ))}
    </div>
    </div>
  );
};

const handleGoBackClick = () => {
  // Handle go back logic
};

const cardData = [
  {
    title: 'Card 1',
    description: 'Description for card 1',
    images: [{pic1}]
  },
  {
    title: 'Card 2',
    description: 'Description for card 2',
    images: [{images}]
  },
  {
    title: 'Card 2',
    description: 'Description for card 2',
    images: [{images}]
  },
  {
    title: 'Card 2',
    description: 'Description for card 2',
    images: [{images}]
  },
  // Add more card data here
];

export default OffrEmployee;
