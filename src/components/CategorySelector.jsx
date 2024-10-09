import React from 'react';

const CategorySelector = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="category-selector">
      <label htmlFor="category-select">Välj en kategori:</label>
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

export default CategorySelector;
