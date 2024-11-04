

import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import homeIcon from '../assets/home_icon.png';
import CategoryDropDown from './Category/CategoryDropDown';

const HeaderHome = ({ searchTerm, onSearchChange, categories, selectedCategory, onCategoryChange }) => {
  return (
    <header className="header" style={{ textAlign: 'center', padding: '20px 0' }}>
      {/* Wrapper för ikonen och texten */}
      <div className='icon-text-wrapper'>
        {/* Home-ikonen överst till vänster */}
        <Link to="/" style={{ position: 'absolute', left: '20px', top: '0' }}>
          <img src={homeIcon} alt="Home" className="home-icon" style={{ width: '100px', height: 'auto' }} />
        </Link>

        {/* Texten "Kreativa Bakelser" centrerad över sökrutan */}
        <div className='header-text'>
            <Link to="/">
        <span style={{ fontSize: '34px', fontWeight: 'bold' }}>
          Kreativa Bakelser
        </span>
            </Link>
        <p id='home-info'>Välkommen till en värld av fantasifulla bakverk! 
            Här hittar du allt från magiska tårtor till kreativa kakor – 
            perfekta för alla dina favorithögtider. 
            Låt dig inspireras och upptäck unika godsaker som får varje högtid att 
            kännas mer speciell</p>
        <p id='slogan'>Låt fantasin jäsa i köket!</p>
        </div>
      </div>

      {/* Sökrutan */}
      <div>
        <CategoryDropDown 
          categories={categories} 
          selectedCategory={selectedCategory} 
          onCategoryChange={onCategoryChange}
        />
        <div>

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

export default HeaderHome;