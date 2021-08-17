import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router-dom';
import {
  fetchFoodsIngredienteMeail,
  fetchFoodsIngredienteDrink,
  fetchFoodsName,
  fetchFoodsNameDrink,
  fetchFoodsFirstLetter,
  fetchFoodsFirstLetterDrink } from '../Services/Data';

const list = (search, foodOrDrink, selected) => {
  const LOC = window.location.pathname;
  if (LOC === '/comidas') {
    if (selected === 'Ingrediente') {
      fetchFoodsIngredienteMeail(search, foodOrDrink);
    }
    if (selected === 'Nome') {
      fetchFoodsName(search, foodOrDrink);
    }
    if (selected === 'Primeira letra') {
      fetchFoodsFirstLetter(search, foodOrDrink);
    }
  }
  if (LOC === '/bebidas') {
    if (selected === 'Ingrediente') {
      fetchFoodsIngredienteDrink(search, foodOrDrink);
    }
    if (selected === 'Nome') {
      fetchFoodsNameDrink(search, foodOrDrink);
    }
    if (selected === 'Primeira letra') {
      fetchFoodsFirstLetterDrink(search, foodOrDrink);
    }
  }
};

function SearchBar(props) {
  const [selected, setSelected] = useState('');
  const [search, setSearch] = useState('');
  const [listSearch, setListSearch] = useState([]);
  const { setDrinkFromSearch, setFoodFromSearch } = props;

  // const foodOrDrink = () => {
  //   const LOC = window.location.pathname;
  //   const item = { type: '', key: '', id: '' };
  //   const food = ['meal', 'meals', 'idMeal'];
  //   const drink = ['cocktail', 'drinks', 'idDrink'];
  //   if (LOC === '/comidas') {
  //     food.forEach((el, index) => { item[Object.keys(item)[index]] = el; });
  //     return item;
  //   }

  //   drink.forEach((el, index) => { item[Object.keys(item)[index]] = el; });
  //   return item;
  // };
  const foodOrDrink = (x) => {
    if (x !== null) {
      setListSearch(x);
      const LOC = window.location.pathname;
      if (LOC === '/comidas') {
        setFoodFromSearch(x);
      }
      if (LOC === '/bebidas') {
        setDrinkFromSearch(x);
      }
    }
  };

  if (listSearch.length === 1) {
    const LOC = window.location.pathname;
    if (LOC === '/comidas') {
      return (<Redirect
        to={ `/comidas/${listSearch[0].idMeal}` }
      />);
    }
    if (LOC === '/bebidas') {
      return (<Redirect
        to={ `/bebidas/${listSearch[0].idDrink}` }
      />);
    }
  }

  return (
    <div>
      <div
        className="radios form-check form-check-inline"
        onChange={ ({ target }) => setSelected(target.value) }
      >
        <label htmlFor="radio" className="form-check-label">
          {' '}
          Ingrediente
          <input
            className="form-check-input"
            type="radio"
            data-testid="ingredient-search-radio"
            id="radio"
            name="radio"
            value="Ingrediente"
          />
        </label>
        <label
          htmlFor="radio"
          className="form-check-label"
        >
          {' '}
          Nome
          <input
            className="form-check-input"
            type="radio"
            data-testid="name-search-radio"
            id="radio"
            name="radio"
            value="Nome"
          />
        </label>
        <label
          htmlFor="radio"
          className="form-check-label"
        >
          {' '}
          Primeira letra
          <input
            className="form-check-input"
            type="radio"
            data-testid="first-letter-search-radio"
            id="radio"
            name="radio"
            value="Primeira letra"
          />
        </label>
      </div>
      <label
        htmlFor="search"
        className="form-check-label"
      >
        <input
          type="text"
          data-testid="search-input"
          id="search"
          onChange={ ({ target }) => setSearch(target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => list(search, foodOrDrink, selected) }
        className="btn btn-primary active"
      >
        Busca
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  setFoodFromSearch: PropTypes.func.isRequired,
  setDrinkFromSearch: PropTypes.func.isRequired,
};
export default SearchBar;
