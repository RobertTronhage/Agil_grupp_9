import React from 'react';
import { Link } from 'react-router-dom';

const Aside = ({ categories, selectedCategory }) => {
  return (
    <aside className="category-list">
      <h2>Kategorier</h2>
      <ul>
        <li>
          <Link to="/" className={!selectedCategory ? 'active' : ''}>
            Alla Kategorier
          </Link>
        </li>
        {categories.map((category, index) => (
          <li key={index}>
            <Link
              to={`/recept/kategori/${category}`}
              className={selectedCategory === category ? 'active' : ''}>
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Aside;
