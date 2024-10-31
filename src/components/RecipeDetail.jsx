import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentSection from './Comment/CommentSection';
import Rating from './Rating/Rating';
import RatingDisplay from './Rating/RatingDisplay';
import Header from './Header';
import { FaRegClock } from "react-icons/fa6";
import CategoryAsideList from './Category/CategoryAsideList'; // Importera kategorilistan
import Footer from "./Footer/Footer";


const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]); // Här hanterar vi kategorier
  const [selectedCategory, setSelectedCategory] = useState("");
  const [ingredientCount, setIngredientCount] = useState(0);
  
  
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const response = await fetch("https://recept9-pedal.reky.se/recipes"); // Hämta alla recept
        if (!response.ok) {
          throw new Error("Något gick fel vid hämtningen av recepten.");
        }
        const data = await response.json();
        
        // Extrahera alla kategorier från alla recept
        const allCategories = data.flatMap((recipe) => recipe.categories);
        const uniqueCategories = [...new Set(allCategories)]; // Skapa en lista med unika kategorier
        setCategories(uniqueCategories);

        // Hämta det enskilda receptet
        const selectedRecipe = data.find((recipe) => recipe._id === id);
        setRecipe(selectedRecipe);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAllCategories();
  }, [id]);
  
  const getDifficulty = (time) => {
    if (time < 30) return 'Enkel';   // Enkel
    if (time >= 30 && time <= 60) return 'Medel';  // Medel
    return 'Avancerad';  // Avancerad
  };
  
  
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
  const difficulty = getDifficulty(recipe.timeInMins);
  
  return (
    <div className="recipe-detail container">
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


      {/* Titel, beskrivning och bild*/}
      <div className='recipe-header-containter'>
        <div className='recipe-header'>

      <div className="recipe-title">
        <h1>{recipe.title}</h1>

        <RatingDisplay id={id} />
      </div>
      <div className='recipe-header-props'>
        <p>
        <FaRegClock /> {recipe.timeInMins} min. </p>
        <p> {recipe.ingredients.length} ingredienser</p>
        <p>{difficulty}</p>
      </div>
      <div className="recipe-description">
        <p id='categories'>Kategorier: {recipe.categories.join(", ")}</p>
        <p>{recipe.description}</p>
      </div>
        </div>
      <div className='recipe-img-container'>
      <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="recipe-image"
        />
      </div>

      </div>

         {/* Ingredienser och instruktioner */}
         <div className="recipe-details-container">
        <div className='recipe-ingredients'>
          <h2>Ingredienser</h2>
          <ul>
            {recipe.ingredients.map((ingredient, index)=>(
            <li key={index}> <span>{ingredient.amount}</span> {ingredient.unit} {ingredient.name}</li>
            ))}
          </ul>
        </div>
        
        <div className="recipe-instructions">
          <h2>Instruktioner:</h2>
          <ol>
            {recipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
            ))}
          </ol>
          <h4>Vad tyckte du om receptet?</h4>
          <Rating id={id} />
        </div>
      </div>

      {/* Rating och kommentarsektion */}
      <div className="recipe-footer">
        <h2>Betygsätt detta recept:</h2>
        <Rating id={id} />
        <CommentSection id={id} />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default RecipeDetail;
