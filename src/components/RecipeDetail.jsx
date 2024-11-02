
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentSection from './Comment/CommentSection';
import Rating from './Rating/Rating';
import RatingDisplay from './Rating/RatingDisplay';
import HeaderRecipe from './HeaderRecipe';
import { FaRegClock } from "react-icons/fa6";
import CategoryAsideList from "./Category/CategoryAsideList"; // Importera kategorilistan
import Footer from "./Footer/Footer";

/**
 * RecipeDetail component fetches and displays detailed information about a specific recipe.
 * It includes the recipe's title, description, image, ingredients, instructions, and user ratings.
 * It also allows users to search for recipes and filter by categories.
 *
 * @component
 * @example
 * return (
 *   <RecipeDetail />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @function
 * @name RecipeDetail
 *
 * @description
 * This component fetches all recipes from the API and extracts unique categories.
 * It then finds the specific recipe by its ID and displays its details.
 * It also handles loading and error states.
 *
 * @hook
 * @name useParams
 * @description Extracts the recipe ID from the URL parameters.
 *
 * @hook
 * @name useState
 * @description Manages the state for recipe details, loading, error, user rating, search term, categories, selected category, and ingredient count.
 *
 * @hook
 * @name useEffect
 * @description Fetches all recipes and extracts unique categories when the component mounts or the recipe ID changes.
 *
 * @param {string} id - The ID of the recipe to fetch and display.
 * @param {Object} recipe - The detailed information of the recipe.
 * @param {boolean} loading - The loading state while fetching the recipe.
 * @param {string|null} error - The error message if fetching the recipe fails.
 * @param {number} userRating - The user's rating for the recipe.
 * @param {string} searchTerm - The search term for filtering recipes.
 * @param {Array<string>} categories - The list of unique categories extracted from all recipes.
 * @param {string} selectedCategory - The currently selected category for filtering recipes.
 * @param {number} ingredientCount - The count of ingredients in the recipe.
 *
 * @function
 * @name fetchAllCategories
 * @description Fetches all recipes from the API, extracts unique categories, and finds the specific recipe by its ID.
 *
 * @function
 * @name getDifficulty
 * @description Determines the difficulty level of the recipe based on the time required to prepare it.
 * @param {number} time - The time required to prepare the recipe in minutes.
 * @returns {string} The difficulty level of the recipe ('Enkel', 'Medel', 'Avancerad').
 *
 * @function
 * @name handleCategoryChange
 * @description Updates the selected category for filtering recipes.
 * @param {string} category - The category to select.
 */

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]); // Här hanterar vi kategorier
  const [selectedCategory, setSelectedCategory] = useState("");


  
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
    if (time < 30) return "Enkel"; // Enkel
    if (time >= 30 && time <= 60) return "Medel"; // Medel
    return "Avancerad"; // Avancerad
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
      <HeaderRecipe
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

<div className='content-wrapper'>
      {/* Kategorilistan, som nu använder alla unika kategorier */}
      <CategoryAsideList
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />


      <div className='recipe-content'>
      {/* Titel, beskrivning och bild*/}
      <div className="recipe-header-containter">
        <div className="recipe-header">
          <div className="recipe-title">
            <h1>{recipe.title}</h1>

            <RatingDisplay id={id} />
          </div>
          <div className="recipe-header-props">
            <p>
              <FaRegClock /> {recipe.timeInMins} min.{" "}
            </p>
            <p> {recipe.ingredients.length} ingredienser</p>
            <p>{difficulty}</p>
          </div>
          <div className="recipe-description">
            <p id="categories">Kategorier: {recipe.categories.join(", ")}</p>
            <p>{recipe.description}</p>
          </div>
        </div>
        <div className="recipe-img-container">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="recipe-image"
          />
        </div>
      </div>

      {/* Ingredienser och instruktioner */}
      <div className="recipe-details-container">
        <div className="recipe-ingredients">
          <h2>Ingredienser</h2>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                {" "}
                <span>{ingredient.amount}</span> {ingredient.unit}{" "}
                {ingredient.name}
              </li>
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
      <div className="recipe-comments-container">
        <CommentSection id={id} />
      </div>
      </div>
  </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default RecipeDetail;
