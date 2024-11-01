import React from "react";
import { Link } from "react-router-dom";
import "./category.css";

/**
 * CategoryAsideList component renders a list of categories as links.
 *
 * @param {Object} props - The component props.
 * @param {Array<string>} props.categories - An array of category names.
 * @param {string} props.selectedCategory - The currently selected category.
 *
 * @returns {JSX.Element} The rendered component.
 */
const CategoryAsideList = ({ categories, selectedCategory }) => {
  return (
    <aside className="category-list-wrapper">
      <h2>Kategorier</h2>
      <ul className="category-list">
        {/* Alternativ för alla kategorier */}
        <li className="list-item">
          <Link to="/" className={!selectedCategory ? "active" : ""}>
            Alla Kategorier
          </Link>
        </li>

        {/* Loopa igenom kategorier och visa länkar */}
        {categories.map((category, index) => (
          <li key={index} className="list-item">
            <Link
              to={`/recept/kategori/${category}`}
              className={selectedCategory === category ? "active" : ""}
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default CategoryAsideList;
