import React from "react";

/**
 * SearchBar component renders an input field for searching recipes.
 *
 * @param {Object} props - The component props.
 * @param {string} props.searchTerm - The current search term.
 * @param {function} props.onSearchChange - Callback function to handle changes in the search input.
 * @returns {JSX.Element} The rendered search input element.
 */

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
  {
    /* Skicka upp sökterm */
  }
};

export default SearchBar;
