import React from 'react';

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

const RecipeCard = ({ recipe }) => {
  const difficulty = getDifficulty(recipe.time);
  const difficultyImage = getDifficultyImage(difficulty);

  return (
    <div className="recipe-card">
      <h2>{recipe.name}</h2>
      <p>Baking Time: {recipe.time} minutes</p>
      <p>Difficulty: {difficulty}</p>
      {/* Visar svårighetsbilden */}
      <img src={difficultyImage} alt={`${difficulty} level`} />
    </div>
  );
};

export default RecipeCard;
