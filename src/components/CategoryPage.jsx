import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import Header from "./Header";

const CategoryPage = () => {
  const { kategori } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRecipesByCategory = async () => {
      try {
        const response = await fetch("https://recept9-pedal.reky.se/recipes");
        if (!response.ok) {
          throw new Error("Något gick fel vid hämtningen av data.");
        }
        const data = await response.json();

        // Filtrerar recept baserat på kategori
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

  // Hanterar sökningar inom den valda kategorin
  const handleSearchChange = (searchValue) => {
    setSearchTerm(searchValue);
  };

  // Filtrerar recept baserat på sökterm inom den valda kategorin
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Laddar...</p>;
  }

  if (error) {
    return <p>Fel: {error}</p>;
  }

  return (
    <div className="container">
      {/* Inkluderar Header med sökfält */}
      <Header searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <h2>Recept i kategorin: {kategori}</h2>
      <div className="recipes">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe, index) => (
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
