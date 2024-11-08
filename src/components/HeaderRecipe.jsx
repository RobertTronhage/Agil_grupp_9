import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import homeIcon from '../assets/home_icon.png';
import CategoryDropDown from './Category/CategoryDropDown'


const HeaderRecipe = ({ searchTerm, onSearchChange, categories, selectedCategory, onCategoryChange }) => {
  return (
    <header className="header" style={{ textAlign: 'center', padding: '20px 0' }}>
      {/* Wrapper för ikonen och texten */}
      <div className='icon-text-wrapper'>
        {/* Home-ikonen överst till vänster */}
        <Link to="/" style={{ position: 'absolute', left: '20px', top: '0' }}>
          <img src={homeIcon} alt="Home" className="home-icon" style={{ width: '100px', height: 'auto' }} />
        </Link>
        
        {/* Texten "Kreativa Bakelser" centrerad över sökrutan */}
        <div>
        <Link to="/">
        <span style={{ fontSize: '34px', fontWeight: 'bold' }}>
          Kreativa Bakelser
        </span>
            </Link>
        <p>Låt fantasin jäsa i köket!</p>
        </div>
      </div>

      {/* Sökrutan */}
      <div>
        <CategoryDropDown 
          categories={categories} 
          selectedCategory={selectedCategory} 
          onCategoryChange={onCategoryChange}
        />
        <div className='searchbar-hidden'>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          style={{ width: '50px', padding: '8px', fontSize: '14px' }}
        />

        </div>
      </div>

    </header>
  );
};

export default HeaderRecipe;
