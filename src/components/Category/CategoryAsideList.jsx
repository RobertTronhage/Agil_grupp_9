import React from 'react';
import { Link, useParams } from 'react-router-dom';

const CategoryAsideList = ({ categories, selectedCategory }) => {

  const {kategori} = useParams();
  return (
    <aside className="category-list-wrapper">
      <h2>Kategorier</h2>
      <ul className='category-list'>
        <li className='list-item'>
          <Link to="/" className={!selectedCategory ? 'active' : ''}>
            Alla Kategorier
          </Link>
        </li>
        {categories.sort().map((category, index) => {
          return <li key={index} className='list-item'>
            <Link
              to={`/recept/kategori/${category}`}
              className={kategori === category ? 'active' : ''}>
              {category}
            </Link>
          </li>
})}
      </ul>
    </aside>
  );
};

export default CategoryAsideList;
