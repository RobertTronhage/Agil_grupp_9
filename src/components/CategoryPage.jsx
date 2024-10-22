import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import Header from "./Header";
import CategoryAsideList from "./Category/CategoryAsideList";

const categoryBackgrounds = {
  halloween: "url('/path/to/halloween-background.jpg')",
  christmas: "url('/path/to/christmas-background.jpg')",
  easter: "url(')",  // Använd den uppladdade påskbilden
};

const CategoryPage = () => {
  const { kategori } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const backgroundImage = categoryBackgrounds[kategori.toLowerCase()] || "none";

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
    <div className="category-page container">
  <Header 
    categories={categories} 
    selectedCategory={selectedCategory} 
    onCategoryChange={handleCategoryChange} 
  />
  <div className="content-wrapper">
    <CategoryAsideList 
      categories={categories} 
      selectedCategory={selectedCategory} 
    />
    <div className="recipes category-recipes">
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
</div>

  );
};

export default CategoryPage;
