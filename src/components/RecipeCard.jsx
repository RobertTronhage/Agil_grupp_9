import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating/Rating';
import { FaRegClock } from "react-icons/fa6";
import enkelImage from "../assets/enkel-dark-background.png";
import medelImage from "../assets/medel-dark-background.png";
import avanceradImage from "../assets/avancerad-dark-background.png";

import './RecipeCard.css'


// Funktion som bestämmer svårighetsgraden baserat på tid
const getDifficulty = (time) => {
  if (time < 30) return 'Enkel';   // Enkel
  if (time >= 30 && time <= 60) return 'Medel';  // Medel
  return 'Avancerad';  // Avancerad
};

// Funktion som returnerar bildvägen baserat på svårighetsgraden
const getDifficultyImage = (difficulty) => {
  switch (difficulty.toLowerCase()) {
    case 'enkel':
      return enkelImage;  // Bild för "Enkel"
    case 'medel':
      return medelImage;  // Bild för "Medel"
    case 'avancerad':
      return avanceradImage;  // Bild för "Avancerad"
    default:
      return null;
  }
};



const RecipeCard = ({ title, imageUrl, categories, timeInMins, id }) => {
  const difficulty = getDifficulty(timeInMins);
  const difficultyImage = getDifficultyImage(difficulty);

  return (
    <div className="recipe-card">
      <Link to={`/recept/${id}`}>
        <img className='recipe-card-img' src={imageUrl || 'default-image-url.jpg'} alt={title || 'Recept'} />
      </Link>
      <div className="recipe-card-content">
        <h2>{title || 'Recept utan namn'}</h2>
        <p>Kategori: {categories ? categories.join(', ') : 'Okänd kategori'}</p>
       
       <div className='recipe-card-props'>
        <p><FaRegClock /> {timeInMins ? `${timeInMins} minuter` : 'Okänd tid'} </p>
        {difficultyImage && (
  <img id='dificulty-icon'
    src={difficultyImage}
    alt={`${difficulty} nivå`}
  />
)}

       </div>
      </div>
      <Rating id={id} />
    </div>
  );
};

export default RecipeCard;
