import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentSection from './Comment/CommentSection';
import Rating from './Rating/Rating';
import Header from './Header';
import CategoryAsideList from './Category/CategoryAsideList'; // Importera kategorilistan

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]); // Här hanterar vi kategorier
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const response = await fetch('https://recept9-pedal.reky.se/recipes'); // Hämta alla recept
        if (!response.ok) {
          throw new Error('Något gick fel vid hämtningen av recepten.');
        }
        const data = await response.json();

        // Extrahera alla kategorier från alla recept
        const allCategories = data.flatMap(recipe => recipe.categories);
        const uniqueCategories = [...new Set(allCategories)]; // Skapa en lista med unika kategorier
        setCategories(uniqueCategories);

        // Hämta det enskilda receptet
        const selectedRecipe = data.find(recipe => recipe._id === id);
        setRecipe(selectedRecipe);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCategories();
  }, [id]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

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
      {/* Header med sökruta och ikon */}
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Kategorilistan, som nu använder alla unika kategorier */}
      <CategoryAsideList
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Titel och beskrivning */}
      <div className="recipe-header-title">
        <h1>{recipe.title}</h1>
      </div>
      <div className="recipe-description">
        <p>{recipe.description}</p>
      </div>

      {/* Kategori och baktid */}
      <div className="recipe-category">
        <p>Kategorier: {recipe.categories.join(', ')}</p>
        <p>Tid att baka: {recipe.timeInMins} minuter</p>
      </div>

      {/* Bild och receptdetaljer */}
      <div className="recipe-header">
        <img src={recipe.imageUrl} alt={recipe.title} className="recipe-image" />
        <div className="recipe-info">
          <p>{recipe.description}</p>
        </div>
      </div>

      {/* Instruktioner */}
      <div className="recipe-instructions">
        <h2>Instruktioner:</h2>
        <ol>
          {recipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>

      {/* Rating och kommentarsektion */}
      <div className="recipe-footer">
        <h2>Betygsätt detta recept:</h2>
        <Rating id={id} />
        <CommentSection id={id} />
      </div>
    </div>
  );
};

export default RecipeDetail;
