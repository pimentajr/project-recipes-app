import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { RequestHook } from '../Context/RequestHook';

import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function HeaderDrink({ title, search }) {
  const [showFilterInput, setShowFilter] = useState(false);
  const [inputTextSearch, setInputTextSearch] = useState('');
  const [radio, setRadio] = useState('');

  const {
    filteredDrink,
    setFilteredDrink,
    filterByNameDrink,
    filterByIngredientDrink,
    filterByFirstLetterDrink,
  } = RequestHook();

  // useEffect(() => {
  //   setShowFilter(true);
  // }, []);

  const nameSearch = 'name-search';
  const firstLetter = 'first-letter';
  const ingredient = 'ingredient';

  function handleButtonDrink(option) {
    switch (option) {
    case (nameSearch):
      setFilteredDrink(filterByNameDrink(inputTextSearch));
      if (filteredDrink.length < 1) {
        global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
        break;
      }
      break;
    case (firstLetter):
      if (inputTextSearch.length > 1) {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
        break;
      }
      setFilteredDrink(filterByFirstLetterDrink(inputTextSearch));
      break;
    case (ingredient):
      setFilteredDrink(filterByIngredientDrink(inputTextSearch));
      break;
    default:
      global.alert('Escolha uma opção de filtro!');
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
            onClick={ () => handleButtonDrink(radio) }
          >
            Buscar
          </button>
        </form>
      ) }
    </header>
  );
}

HeaderDrink.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
};

export default HeaderDrink;
