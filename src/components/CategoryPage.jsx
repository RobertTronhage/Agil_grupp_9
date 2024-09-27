import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Importera useParams för att hämta URL-parametrar
import RecipeCard from './RecipeCard'; // Importera RecipeCard-komponenten

const CategoryPage = () => {
  const { category } = useParams(); // Hämta kategori från URL-parametrarna
  const [recipes, setRecipes] = useState([]); // State för att lagra recepten
  const [loading, setLoading] = useState(true); // State för att hantera laddning
  const [error, setError] = useState(null); // State för felhantering

  useEffect(() => {
    const fetchRecipesByCategory = async () => {
      try {
        const response = await fetch('https://recept9-pedal.reky.se/recipes');
        if (!response.ok) {
          throw new Error('Något gick fel vid hämtningen av data.');
        }
        const data = await response.json();

        // Filtrera recepten baserat på vald kategori
        const filteredRecipes = data.filter(recipe => recipe.categories.includes(category));
        setRecipes(filteredRecipes); // Sätt de filtrerade recepten
      } catch (error) {
        setError(error.message); // Sätt felmeddelande
      } finally {
        setLoading(false); // Sluta ladda
      }
    };

    fetchRecipesByCategory();
  }, [category]); // Hämta nya recept om kategorin ändras

  if (loading) {
    return <p>Loading...</p>; // Visa laddningstext
  }

  if (error) {
    return <p>Error: {error}</p>; // Visa felmeddelande
  }

  return (
    <div className="category-page">
      <h2>Recept i kategorin: {category}</h2>
      <div className="recipes">
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <RecipeCard
              key={index}
              title={recipe.title}
              imageUrl={recipe.imageUrl}
              categories={recipe.categories}
              timeInMins={recipe.timeInMins}
              id={recipe.id} // Se till att id finns i receptobjekten
            />
          ))
        ) : (
          <p>Inga recept hittades i denna kategori.</p> // Meddelande om inga recept
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
