import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBarHeader from './SearchBarHeader';
import '../styles/header.css';

function Header({ title, searchButton }) {
  const [searchBar, setSearchBar] = useState(false);

  function handleSearchBar() {
    setSearchBar(!searchBar);
  }

  return (
    <header className="header">
      <div className="headerContainer">
        <Link to="/perfil">
          <button type="button">
            <img src={ profileIcon } alt="profileIcon" data-testid="profile-top-btn" />
          </button>
        </Link>
        <p data-testid="page-title">{ title }</p>
        {searchButton ? (
          <div>
            <button type="button" onClick={ handleSearchBar }>
              <img src={ searchIcon } alt="searchIcon" data-testid="search-top-btn" />
            </button>
          </div>
        ) : (
          <div>
            <button type="button" className="buttnInvisible">
              <img src={ searchIcon } alt="searchIcon" />
            </button>
          </div>
        )}
      </div>
      {searchBar && (
        <SearchBarHeader foodOrDrink={ title } />
      )}
    </header>
  );
}

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
  searchButton: PropTypes.bool,
};

Header.defaultProps = {
  searchButton: false,
};
