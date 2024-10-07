import React from 'react';
import { Link } from 'react-router-dom'; // Importera Link för navigering
import Rating from './Rating'; // Importera Rating-komponenten

// Funktion som bestämmer svårighetsgraden baserat på tid
const getDifficulty = (time) => {
  if (time < 30) return 'Easy';   // Enkel
  if (time >= 30 && time <= 60) return 'Medium';  // Medel
  return 'Hard';  // Svår
};

// Funktion som returnerar bildvägen baserat på svårighetsgraden
const getDifficultyImage = (difficulty) => {
  switch (difficulty) {
    case 'Easy':
      return '/path/to/easy-image.png';  // Använd den faktiska vägen till bilden
    case 'Medium':
      return '/path/to/medium-image.png';
    case 'Hard':
      return '/path/to/hard-image.png';
    default:
      return null;
  }
};

const RecipeCard = ({ title, imageUrl, categories, timeInMins, id }) => {
  const difficulty = getDifficulty(timeInMins);
  const difficultyImage = getDifficultyImage(difficulty);

  // Callback-funktion för att hantera när rating ändras
  const handleRatingChange = (newRating) => {
    console.log(`Ny rating för ${title}: ${newRating}`);
    // Här kan du skicka ny rating till din backend eller uppdatera state
  };

  return (
    <div className="recipe-card">
      {/* Link runt hela receptkortet för att navigera till receptdetaljer */}
      <Link to={`/recept/${id}`}>
        <img src={imageUrl || 'default-image-url.jpg'} alt={title || 'Recept'} />
        <h2>{title || 'Recept utan namn'}</h2>
        <p>Kategori: {categories ? categories.join(', ') : 'Okänd kategori'}</p>
        <p>Tid: {timeInMins ? `${timeInMins} minuter` : 'Okänd tid'}</p>
        <p>Svårighetsgrad:</p>
        {difficultyImage && <img src={difficultyImage} alt={`${difficulty} level`} />}
      </Link>
      
      {/* Rating-sektion */}
      <Rating onRatingChange={handleRatingChange} />
    </div>
  );
};

export default RecipeCard;
