import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import Header from "./Header";
import CategoryAsideList from "./Category/CategoryAsideList";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("https://recept9-pedal.reky.se/recipes");
        if (!response.ok) {
          throw new Error("Något gick fel vid hämtningen av data.");
        }
        const data = await response.json();
        setRecipes(data);
        setFilteredRecipes(data);

        const allCategories = data.flatMap((recipe) => recipe.categories);
        const uniqueCategories = [...new Set(allCategories)];
        setCategories(uniqueCategories);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    const filtered = recipes.filter((recipe) => {
      return recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredRecipes(filtered);
  }, [searchTerm, recipes]);

  const handleSearchChange = (searchValue) => {
    setSearchTerm(searchValue);
  };

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
    <div className="homepage container">
  <Header 
    searchTerm={searchTerm} 
    onSearchChange={handleSearchChange} 
    categories={categories} 
    selectedCategory={selectedCategory} 
    onCategoryChange={handleCategoryChange} 
  />
  <div className="content-wrapper">
    <CategoryAsideList 
      categories={categories} 
      selectedCategory={selectedCategory} 
    />
    <div className="recipes homepage-recipes">
      {filteredRecipes.map((recipe, index) => (
        <RecipeCard
          key={index}
          title={recipe.title}
          imageUrl={recipe.imageUrl}
          categories={recipe.categories}
          timeInMins={recipe.timeInMins}
          id={recipe._id}
        />
      ))}
    </div>
  </div>
</div>
  );
};

export default HomePage;
