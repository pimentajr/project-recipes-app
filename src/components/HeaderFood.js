import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { RequestHook } from '../Context/RequestHook';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import {
  searchByName,
  searchByIngredient,
  searchByFirstLetter } from '../services/RequestFood';

function HeaderFood({ title, search }) {
  const [showFilterInput, setShowFilter] = useState(false);
  const [inputTextSearch, setInputTextSearch] = useState('');
  const [radio, setRadio] = useState('');

  const {
    setByFilter,
    setFiltered,
  } = RequestHook();

  const nameSearch = 'name-search';
  const firstLetter = 'first-letter';
  const ingredient = 'ingredient';

  async function handleButtonFood(option) {
    let request;
    switch (option) {
    case (nameSearch):
      request = await searchByName(inputTextSearch);
      if (request === null || request.length < 1) {
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
        break;
      }
      setFiltered(request);
      setByFilter(true);
      break;
    case (firstLetter):
      if (inputTextSearch.length > 1) {
        alert('Sua busca deve conter somente 1 (um) caracter');
        break;
      }
      request = await searchByFirstLetter(inputTextSearch);
      setFiltered(request);
      setByFilter(true);
      break;
    case (ingredient):
      request = await searchByIngredient(inputTextSearch);
      setFiltered(request);
      setByFilter(true);
      break;
    default:
      alert('Escolha uma opção de filtro!');
    }
  }

  return (
    <header>
      <Link to="/perfil">
        <button type="button">
          <img data-testid="profile-top-btn" src={ profileIcon } alt="profile icon" />
        </button>
      </Link>
      <h1 data-testid="page-title">{ title }</h1>

      { search && (
        <button
          type="button"
          onClick={ () => setShowFilter((state) => !state) }
        >
          <img data-testid="search-top-btn" src={ searchIcon } alt="search icon" />
        </button>) }

      { !showFilterInput ? '' : (
        <form>
          <input
            data-testid="search-input"
            type="text"
            value={ inputTextSearch }
            onChange={ (e) => setInputTextSearch(e.target.value) }
          />
          <label htmlFor="ingredient">
            <input
              data-testid="ingredient-search-radio"
              type="radio"
              id="ingredient"
              name="radio-button"
              value="ingredient"
              onChange={ () => setRadio('ingredient') }
            />
            Ingrediente
          </label>
          { ' ' }
          <label htmlFor="name-search">
            <input
              data-testid="name-search-radio"
              type="radio"
              id="name-search"
              name="radio-button"
              value="name-search"
              onChange={ () => setRadio('name-search') }
            />
            Nome
          </label>
          { ' ' }
          <label htmlFor="first-letter">
            <input
              data-testid="first-letter-search-radio"
              type="radio"
              id="first-letter"
              name="radio-button"
              value="first-letter"
              onChange={ () => setRadio('first-letter') }
            />
            Primeira letra
          </label>
          <button
            data-testid="exec-search-btn"
            type="button"
            onClick={ () => handleButtonFood(radio) }
          >
            Buscar
          </button>
        </form>
      ) }
    </header>
  );
}

HeaderFood.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
};

export default HeaderFood;
