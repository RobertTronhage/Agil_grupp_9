import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import { Link, useNavigate } from "react-router-dom"; // Importera useNavigate

const HomePage = () => {
  const [recipes, setRecipes] = useState([]); // Initialisera recept
  const [loading, setLoading] = useState(true); // Laddningsstatus
  const [error, setError] = useState(null); // Felstatus
  const [searchTerm, setSearchTerm] = useState(""); // Sökterm
  const [filteredRecipes, setFilteredRecipes] = useState([]); // Filtrerade recept
  const [categories, setCategories] = useState([]); // Kategorier
  const [selectedCategory, setSelectedCategory] = useState(""); // Vald kategori

  const navigate = useNavigate();

  // Funktion för att slumpa recepten
  const shuffleRecipes = (arr) => {
    return arr
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  };

  // Hämta recepten när komponenten monteras
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("https://recept9-pedal.reky.se/recipes");
        if (!response.ok) {
          throw new Error("Något gick fel vid hämtningen av data.");
        }
        const data = await response.json();
        const shuffled = shuffleRecipes(data); // Slumpa recepten
        setRecipes(shuffled); // Sätt recepten
        setFilteredRecipes(shuffled); // Sätt de filtrerade recepten

        const allCategories = data.flatMap((recipe) => recipe.categories);
        const uniqueCategories = [...new Set(allCategories)];
        setCategories(uniqueCategories); // Sätt unika kategorier
      } catch (error) {
        setError(error.message); // Sätt felmeddelande
      } finally {
        setLoading(false); // Stäng av laddning
      }
    };

    fetchRecipes();
  }, []);

  // Filtrera recepten baserat på sökterm
  useEffect(() => {
    if (searchTerm) {
      const results = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRecipes(results);
    } else {
      setFilteredRecipes(recipes);
    }
  }, [searchTerm, recipes]);

  // Hantera sökändringar
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Hantera kategoriändringar
  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setSelectedCategory(selected);

    if (selected) {
      // Navigera till URL med vald kategori
      navigate(`/recept/kategori/${selected}`);
    } else {
      setFilteredRecipes(recipes);
      navigate("/"); // Navigera tillbaka till root om ingen kategori är vald
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Laddningstext
  }

  if (error) {
    return <p>Error: {error}</p>; // Felmeddelande
  }

  return (
    <div className="recipe-list">
      <input
        type="text"
        placeholder="Sök recept..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="category-dropdown"
      >
        <option value="">Alla Kategorier</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      <div className="recipes">
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
  );
};

export default HomePage;
