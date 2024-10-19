import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import Header from "./Header";
import CategoryAsideList from "./Category/CategoryAsideList";


// Lägg till påsktemat i bakgrundsobjektet
const categoryBackgrounds = {
  halloween: "url('/path/to/halloween-background.jpg')",
  christmas: "url('/path/to/christmas-background.jpg')",
  easter: "url(')",  // Använd den uppladdade påskbilden
  // Lägg till fler kategorier och bilder här
};

const CategoryPage = () => {
  const { kategori } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Hämta rätt bakgrundsbild baserat på kategori
  const backgroundImage = categoryBackgrounds[kategori.toLowerCase()] || "none"; // Om ingen bakgrund hittas

  useEffect(() => {
    const fetchRecipesByCategory = async () => {
      try {
        const response = await fetch("https://recept9-pedal.reky.se/recipes");
        if (!response.ok) {
          throw new Error("Något gick fel vid hämtningen av data.");
        }
        const data = await response.json();
        const allCategories = data.flatMap((recipe) => recipe.categories);
        const uniqueCategories = [...new Set(allCategories)];
        setCategories(uniqueCategories);

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

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category) {
      navigate(`/recept/kategori/${category}`);
    } else {
      setFilteredRecipes(recipes);
      navigate("/");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div
      className="category-page"
      style={{
        backgroundImage: backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Header 
      categories={categories} 
      selectedCategory={selectedCategory} 
       />


      <h2>Recept i kategorin: {kategori}</h2>

      <CategoryAsideList 
      categories={categories} 
      selectedCategory={selectedCategory} 
      />

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
