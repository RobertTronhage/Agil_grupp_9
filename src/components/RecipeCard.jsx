import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating/Rating';
import enkelImage from "../assets/enkel.png";
import medelImage from "../assets/medel.png";
import avanceradImage from "../assets/avancerad.png";

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
        <img src={imageUrl || 'default-image-url.jpg'} alt={title || 'Recept'} />
      </Link>
      <div className="recipe-card-content">
        <h2>{title || 'Recept utan namn'}</h2>
        <p>Kategori: {categories ? categories.join(', ') : 'Okänd kategori'}</p>
        <p>Tid: {timeInMins ? `${timeInMins} minuter` : 'Okänd tid'}</p>
        <p>Svårighetsgrad: {difficulty}</p>
        {difficultyImage && (
  <img
    src={difficultyImage}
    alt={`${difficulty} nivå`}
    style={{
      width: '100px',   // Direkt justering av bredden
      height: '100px',  // Direkt justering av höjden
      objectFit: 'contain',  // Se till att hela bilden syns inom dessa mått
    }}
  />
)}

      </div>
      <Rating id={id} />
    </div>
  );
};

export default RecipeCard;
