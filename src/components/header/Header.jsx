import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

import ProfileIcon from '../../images/profileIcon.svg';
import SearchIcon from '../../images/searchIcon.svg';

import './Header.css';

export default function Header({ pageTitle, itHasNotSearchButton }) {
  const [searchText, setSearchText] = useState('');
  // const [filter, setFilter] = useState('');
  const [searchFormHidden, setSearchFormHidden] = useState(false);
  const history = useHistory();
  return (
    <div className="HeaderContainer">
      <div className="topBar">
        <input
          type="button"
          onClick={ () => history.push('/perfil') }
          src={ ProfileIcon }
          data-testid="profile-top-btn"
        />

        <h1 data-testid="page-title">{pageTitle}</h1>

        {
          !itHasNotSearchButton
            && (
              <input
                type="button"
                src={ SearchIcon }
                onClick={
                  () => setSearchFormHidden((prevSearchFormHidden) => (
                    !prevSearchFormHidden
                  ))
                }
                data-testid="search-top-btn"
              />)
        }
      </div>
      {
        searchFormHidden
        && (
          <form
            className="searchBarSection"
          >
            <input
              type="text"
              name="searchBar"
              id="searchBar"
              onChange={ (event) => setSearchText(event.target.value) }
              value={ searchText }
              data-testid="search-input"
            />

            <label htmlFor="ingredients">
              Ingredientes
              <input
                type="radio"
                name="filter"
                id="ingredients"
                // onClick={ () => setFilter('ingredients') }
              />
            </label>

            <label htmlFor="name">
              Nome
              <input
                type="radio"
                name="filter"
                id="name"
                // onClick={ () => setFilter('name') }
              />
            </label>

            <label htmlFor="firstLetter">
              Primeira letra
              <input
                type="radio"
                name="filter"
                id="firstLetter"
                // onClick={ () => setFilter('firstLetter') }
              />
            </label>

            <input
              type="submit"
              value="Buscar"
            />
          </form>
        )
      }
    </div>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  itHasNotSearchButton: PropTypes.bool.isRequired,
};
