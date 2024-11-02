import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import RecipeDetail from "./components/RecipeDetail";
import CategoryPage from "./components/CategoryPage"; // Se till att denna är korrekt
import "./App.css";

/**
 * The main application component that sets up the routing for the app.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * return (
 *   <App />
 * )
 */
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recept/:id" element={<RecipeDetail />} />
        <Route path="/recept/kategori/:kategori" element={<CategoryPage />} />
      </Routes>
    </Router>
  );
};

export default App;
