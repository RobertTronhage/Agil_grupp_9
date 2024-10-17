import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import homeIcon from '../assets/home_icon.png';
import CategoryDropDown from './Category/CategoryDropDown';

const Header = ({ searchTerm, onSearchChange, categories, selectedCategory, onCategoryChange}) => {
  return (
    <header className="header" style={{ textAlign: 'center', padding: '20px 0' }}>
      {/* Wrapper för ikonen och texten */}
      <div className='icon-text-wrapper' >
        {/* Home-ikonen överst till vänster */}
        <Link to="/" style={{ position: 'absolute', left: '20px', top: '0' }}>
          <img src={homeIcon} alt="Home" className="home-icon" style={{ width: '100px', height: 'auto' }} />
        </Link>

        {/* Texten "Kreativa Bakelser" centrerad över sökrutan */}
        <span className="header-text" style={{ fontSize: '34px', fontWeight: 'bold' }}>
          Kreativa Bakelser
        </span>
      </div>

      {/* Sökrutan som täcker hela sidan */}
      <div style={{ maxWidth: '100%', padding: '0 20px' }}>
        <CategoryDropDown 
        categories={categories} 
        selectedCategory={selectedCategory} 
        onCategoryChange={onCategoryChange}/>

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          style={{ width: '100%' }}  // Sökrutan täcker hela sidan
        />


      </div>
    </header>
  );
};

export default Header;
