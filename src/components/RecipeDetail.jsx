import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentSection from './Comment/CommentSection';

const RecipeDetail = () => {
  const { id } = useParams(); // Hämta ID från URL
  console.log("Recipe ID from URL:", id); // Logga ID:t för att kontrollera
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`https://recept9-pedal.reky.se/recipes/${id}`); // Använd ID:t i fetch-anropet
        
        if (!response.ok) {
          console.log(response)
          throw new Error('Något gick fel vid hämtningen av receptet.');
        }
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) { // Kontrollera att ID:t är definierat innan du gör fetch
      fetchRecipe();
    }
  }, [id]);

  if (loading) {
    return <p>Laddar...</p>;
  }

  if (error) {
    return <p>Fel: {error}</p>;
  }

  if (!recipe) {
    return <p>Receptet hittades inte.</p>;
  }

  return (
    <div className="recipe-detail">
      <h1>{recipe.title}</h1>
      <img src={recipe.imageUrl} alt={recipe.title} />
      <p>{recipe.description}</p>
      <h2>Ingredienser:</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient.amount} {ingredient.unit} {ingredient.name}</li>
        ))}
      </ul>
      <h2>Instruktioner:</h2>
      <ol>
        {recipe.instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
      <p>Tid: {recipe.timeInMins} minuter</p>
      <p>Kategorier: {recipe.categories.join(', ')}</p>

      <CommentSection id={id} />
    </div>
  );
};

export default RecipeDetail;
