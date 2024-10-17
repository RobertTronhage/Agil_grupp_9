import React from "react";

const CategoryDropDown = ({ categories, selectedCategory, onCategoryChange }) => {
    return (
      <div className="category-dropdown">
        <label htmlFor="category-select"></label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="">Alla Kategorier</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    );
  };

export default CategoryDropDown;