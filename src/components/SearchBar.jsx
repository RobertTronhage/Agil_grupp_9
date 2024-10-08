import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <input
  type="text"
  placeholder="Sök recept..."
  value={searchTerm}
  onChange={(e) => onSearchChange(e.target.value)}  
  className="search-input"
/>
  );
  {/* Skicka upp sökterm */}
};

export default SearchBar;
