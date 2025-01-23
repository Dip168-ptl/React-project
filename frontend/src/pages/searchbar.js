import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '../Assets/cart.png'; // Import search icon
import './searchbar.css'; // Add your own CSS file or include styles

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search..." className="search-input" />
      <FontAwesomeIcon icon={faSearch} className="search-icon" />
    </div>
  );
};

export default SearchBar;
