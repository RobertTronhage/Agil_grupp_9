import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import Header from "./Header"; // Importera Header-komponenten

const CategoryPage = () => {
  const { kategori } = useParams(); 
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRecipesByCategory = async () => {
      try {
        const response = await fetch("https://recept9-pedal.reky.se/recipes");
        if (!response.ok) {
          throw new Error("Något gick fel vid hämtningen av data.");
        }
        const data = await response.json();

        const filteredRecipes = data.filter(
          (recipe) =>
            Array.isArray(recipe.categories) &&
            recipe.categories.some(
              (cat) => cat.toLowerCase() === kategori.toLowerCase()
            )
        );

        setRecipes(filteredRecipes); 

        const allCategories = data.flatMap((recipe) => recipe.categories);
        const uniqueCategories = [...new Set(allCategories)];
        setCategories(uniqueCategories); 
      } catch (error) {
        setError(error.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchRecipesByCategory();
  }, [kategori]);

  const handleSearchChange = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container">
      {/* Använd Header-komponenten med sökfält och home-icon */}
      <Header searchTerm={searchTerm} onSearchChange={handleSearchChange} />

      <aside>
        <h3>Kategorier:</h3>
        <ul>
          {categories.map((category, index) => (
            <li key={index}>
              <a href={`/recept/kategori/${category}`}>{category}</a>
            </li>
          ))}
        </ul>
      </aside>

      <main>
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
      </main>
    </div>
  );
};

export default CategoryPage;
