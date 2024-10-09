import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import RecipeDetail from "./components/RecipeDetail";
import CategoryPage from "./components/CategoryPage"; // Se till att denna är korrekt
import './App.css';

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
