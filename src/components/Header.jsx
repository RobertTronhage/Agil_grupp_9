import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import homeIcon from "../assets/home_icon.png";
import CategoryDropDown from "./Category/CategoryDropDown";
import "./Header.css";

/**
 * Header component that displays a header section with a home icon, title text, category dropdown, and search bar.
 *
 * @param {Object} props - The component props.
 * @param {string} props.searchTerm - The current search term.
 * @param {function} props.onSearchChange - Callback function to handle changes in the search term.
 * @param {Array} props.categories - List of categories for the dropdown.
 * @param {string} props.selectedCategory - The currently selected category.
 * @param {function} props.onCategoryChange - Callback function to handle changes in the selected category.
 * @returns {JSX.Element} The rendered Header component.
 */
const Header = ({
  searchTerm,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <header
      className="header"
      style={{ textAlign: "center", padding: "20px 0" }}
    >
      {/* Wrapper för ikonen och texten */}
      <div className="icon-text-wrapper">
        {/* Home-ikonen överst till vänster */}
        <Link to="/" style={{ position: "absolute", left: "20px", top: "0" }}>
          <img
            src={homeIcon}
            alt="Home"
            className="home-icon"
            style={{ width: "100px", height: "auto" }}
          />
        </Link>

        {/* Texten "Kreativa Bakelser" centrerad över sökrutan */}
        <span
          className="header-text"
          style={{ fontSize: "34px", fontWeight: "bold" }}
        >
          Kreativa Bakelser
        </span>
      </div>

      {/* Sökrutan */}
      <div style={{ maxWidth: "100%", padding: "0 300px" }}>
        <CategoryDropDown
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          style={{ width: "50px", padding: "8px", fontSize: "14px" }}
        />
      </div>
    </header>
  );
};

export default Header;
