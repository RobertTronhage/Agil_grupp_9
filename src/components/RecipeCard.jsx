// RecipeCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ title, imageUrl, categories, timeInMins, id }) => {
  return (
    <div className="recipe-card">
      <Link to={`/recept/${id}`}>
        <img src={imageUrl} alt={title} />
        <h3>{title}</h3>
        <p>{categories.join(', ')}</p>
        <p>{timeInMins} minuter</p>
      </Link>
    </div>
  );
};

export default RecipeCard;
