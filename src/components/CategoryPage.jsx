import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import Header from "./Header";

const CategoryPage = () => {
  const { kategori } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipesByCategory = async () => {
      try {
        const response = await fetch("https://recept9-pedal.reky.se/recipes");
        if (!response.ok) {
          throw new Error("Något gick fel vid hämtningen av data.");
        }
        const data = await response.json();

        // Filtrera recept baserat på kategori
        const filteredRecipes = data.filter(
          (recipe) =>
            Array.isArray(recipe.categories) &&
            recipe.categories.some(
              (cat) => cat.toLowerCase() === kategori.toLowerCase()
            )
        );

        setRecipes(filteredRecipes);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipesByCategory();
  }, [kategori]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container">
      <Header />
      <h2>Recept i kategorin: {kategori}</h2>
      <div className="recipes">
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <RecipeCard
              key={index}
              title={recipe.title}
              imageUrl={recipe.imageUrl}
              categories={recipe.categories}
              timeInMins={recipe.timeInMins}
              id={recipe._id}
            />
          ))
        ) : (
          <p>Inga recept hittades i denna kategori.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
