import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar'; // Importera den separata sök-komponenten
import homeIcon from '../assets/home_icon.png';

const Header = ({ searchTerm, onSearchChange }) => {
  return (
    <header className="header">
      <Link to="/">
        <img src={homeIcon} alt="Home" className="logo" /> {/* Länk till root */}
      </Link>
      <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} /> {/* Sökfält */}
    </header>
  );
};

export default Header;