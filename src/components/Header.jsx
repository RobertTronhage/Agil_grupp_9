import React from 'react'; 
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import homeIcon from '../assets/home_icon.png';

const Header = ({ searchTerm, onSearchChange }) => {
  return (
    <header className="header">
      <Link to="/">
        <img src={homeIcon} alt="Home" className="logo" />
      </Link>
      <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
    </header>
  );
};

export default Header;
