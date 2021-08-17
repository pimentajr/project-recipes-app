import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

import { useRecipes } from '../../contexts/RecipesContext';

import ProfileIcon from '../../images/profileIcon.svg';
import SearchIcon from '../../images/searchIcon.svg';

import './Header.css';

export default function Header({ pageTitle, itHasNotSearchButton }) {
  const [searchFormHidden, setSearchFormHidden] = useState(false);
  const {
    setFilter,
    searchText,
    setSearchText,
    submitSearch,
  } = useRecipes();
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
            onSubmit={ (event) => submitSearch(event) }
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
                data-testid="ingredient-search-radio"
                onClick={ () => setFilter('ingredients') }
              />
            </label>

            <label htmlFor="name">
              Nome
              <input
                type="radio"
                name="filter"
                id="name"
                data-testid="name-search-radio"
                onClick={ () => setFilter('name') }
              />
            </label>

            <label htmlFor="firstLetter">
              Primeira letra
              <input
                type="radio"
                name="filter"
                id="firstLetter"
                data-testid="first-letter-search-radio"
                onClick={ () => setFilter('firstLetter') }
              />
            </label>

            <input
              type="submit"
              value="Buscar"
              data-testid="exec-search-btn"
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
