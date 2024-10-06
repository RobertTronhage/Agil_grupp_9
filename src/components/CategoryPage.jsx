import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeCard from "./RecipeCard";

const CategoryPage = () => {
  const { kategori } = useParams(); // Hämta 'kategori' från URL-parametrarna
  const [recipes, setRecipes] = useState([]); // State för att lagra recepten
  const [loading, setLoading] = useState(true); // State för att hantera laddning
  const [error, setError] = useState(null); // State för felhantering

  useEffect(() => {
    const fetchRecipesByCategory = async () => {
      try {
        const response = await fetch("https://recept9-pedal.reky.se/recipes");
        if (!response.ok) {
          throw new Error("Något gick fel vid hämtningen av data.");
        }
        const data = await response.json();

        console.log("Alla recept:", data);
        console.log("Vald kategori från URL:", kategori); // OBS: kolla att 'kategori' inte är undefined

        // Filtrera recepten och säkerställ att 'categories' inte är undefined
        const filteredRecipes = data.filter(
          (recipe) =>
            Array.isArray(recipe.categories) && // Kontrollera att 'categories' är en array
            recipe.categories.some(
              (cat) => cat.toLowerCase() === kategori.toLowerCase()
            )
        );

        console.log("Filtrerade recept:", filteredRecipes);

        setRecipes(filteredRecipes); // Sätt de filtrerade recepten
      } catch (error) {
        setError(error.message); // Sätt felmeddelande
      } finally {
        setLoading(false); // Sluta ladda
      }
    };

    fetchRecipesByCategory();
  }, [kategori]); // Notera att vi använder 'kategori' här

  if (loading) {
    return <p>Loading...</p>; // Visa laddningstext
  }

  if (error) {
    return <p>Error: {error}</p>; // Visa felmeddelande
  }

  return (
    <div className="category-page">
      <h2>Recept i kategorin: {kategori}</h2> {/* Använd 'kategori' här */}
      <div className="recipes">
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <RecipeCard
              key={index}
              title={recipe.title}
              imageUrl={recipe.imageUrl}
              categories={recipe.categories}
              timeInMins={recipe.timeInMins}
              id={recipe.id}
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
