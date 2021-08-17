import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { HeaderNavBar, TransparentButton } from '../styles';

function Header({ title, type, showSearchButton }) {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const showSearchBarHandler = () => (
    showSearchBar ? setShowSearchBar(false) : setShowSearchBar(true)
  );

  const searchButton = (
    <TransparentButton
      onClick={ showSearchBarHandler }
    >
      <img src={ searchIcon } alt="search icon" data-testid="search-top-btn" />
    </TransparentButton>);

  return (
    <HeaderNavBar drink={ type === 'drink' }>
      <div className="d-flex justify-content-between align-items-center p-2 px-4">
        <Link to="/perfil">
          <TransparentButton>
            <img src={ profileIcon } alt="Profile Icon" data-testid="profile-top-btn" />
          </TransparentButton>
        </Link>
        <h2 data-testid="page-title">{ title }</h2>
        { showSearchButton ? searchButton : null }
      </div>
      { showSearchBar ? <SearchBar type={ type } /> : null }
    </HeaderNavBar>
  );
}

export default Header;

Header.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  showSearchButton: PropTypes.bool,
};

Header.defaultProps = {
  showSearchButton: false,
  type: 'food',
};
