import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import CategoryAsideList from "./Category/CategoryAsideList";
import RecipeCard from "./RecipeCard";
import Footer from "./Footer/Footer";

const CategoryPage = () => {
  const { kategori } = useParams(); // Hämta vald kategori från URL:en
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]); // Lägg till state för kategorier
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRecipesByCategory = async () => {
      try {
        const response = await fetch("https://recept9-pedal.reky.se/recipes");
        if (!response.ok) {
          throw new Error("Något gick fel vid hämtningen av data.");
        }

        const data = await response.json();

        // Extrahera alla kategorier från recepten
        const allCategories = data.flatMap((recipe) => recipe.categories);
        const uniqueCategories = [...new Set(allCategories)]; // Ta fram unika kategorier
        setCategories(uniqueCategories); // Uppdatera kategorier

        // Filtrera recept baserat på vald kategori
        const categoryRecipes = data.filter((recipe) =>
          recipe.categories.includes(kategori)
        );
        setFilteredRecipes(categoryRecipes);
        setRecipes(categoryRecipes);
    
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipesByCategory();
  }, [kategori]); // Uppdatera när kategori i URL ändras

  useEffect(() => {
    const filtered = recipes.filter((recipe) => {
      return recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredRecipes(filtered);
  }, [searchTerm, recipes]);

  const handleSearchChange = (searchValue) => {
    setSearchTerm(searchValue);
  };

  if (loading) {
    return <p>Laddar...</p>;
  }

  if (error) {
    return <p>Fel: {error}</p>;
  }


  return (
    <div className="category-page container">
      <Header 
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange} 
        categories={categories} 
        selectedCategory={kategori}
      />
  
      <div className="content-wrapper">
        <CategoryAsideList 
          categories={categories}
          selectedCategory={kategori}
        />
  
        {/* Centrera vald kategori ovanför recepten */}
        <div className="recipes-section">
          <div className="selected-category-text">
            <h2>Kategori: {kategori}</h2>
          </div>
          <div className="recipes category-recipes">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe, index) => (
                <RecipeCard key={index}
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
        <div className="footer">
          <Footer />
        </div>
    </div>
  );    
};

export default CategoryPage;
