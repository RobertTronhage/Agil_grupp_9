import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentSection from './Comment/CommentSection';
import Rating from './Rating/Rating';
import RatingDisplay from './Rating/RatingDisplay';
import HeaderRecipe from './HeaderRecipe';
import { FaRegClock } from "react-icons/fa6";
import CategoryAsideList from './Category/CategoryAsideList'; // Importera kategorilistan
import Footer from "./Footer/Footer";


const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingRecipe, setLoadingRecipe] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]); // Här hanterar vi kategorier
  const [selectedCategory, setSelectedCategory] = useState("");

  
    // Hämtar alla recept och sätter det enskilda receptet baserat på ID
    useEffect(() => {
      const fetchRecipe = async () => {
        try {
          const response = await fetch(`https://recept9-pedal.reky.se/recipes/${id}`); 
          if (!response.ok) {
            throw new Error("Något gick fel vid hämtningen av recepten.");
          }
          const data = await response.json();
                  
          setRecipe(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoadingRecipe(false);
        }
      };
  
      fetchRecipe();
    }, [id]);
  

  // Hämtar alla kategorier från en separat URL
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://recept9-pedal.reky.se/categories"); 
        if (!response.ok) {
          throw new Error("Något gick fel vid hämtningen av kategorierna.");
        }
        const data = await response.json();
        const categoryNames = data.map(category => category.name);
        setCategories(categoryNames);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);
  
  const getDifficulty = (time) => {
    if (time < 30) return 'Enkel';   // Enkel
    if (time >= 30 && time <= 60) return 'Medel';  // Medel
    return 'Avancerad';  // Avancerad
  };

  
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  if (loadingCategories) {
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
