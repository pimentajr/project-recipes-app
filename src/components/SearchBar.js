/* eslint-disable no-alert */
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import FetchApi from '../services/ApiFetch';

export default function SearchBar({ searchTrigger }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [inputValue, setInputValue] = useState('');
  const [radioOption, setRadioOption] = useState('ingrediente');

  async function checkBoxSearch() {
    if (radioOption === 'primeiraLetra' && inputValue.length > 1) {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
    const results = await FetchApi(searchTrigger, radioOption, inputValue);
    let mealOrDrink = '';

    if (searchTrigger === 'themealdb') {
      mealOrDrink = 'meals';
    }

    if (searchTrigger === 'thecocktaildb') {
      mealOrDrink = 'drinks';
    }
    if (results[mealOrDrink] === null || results[mealOrDrink] === undefined) {
      return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    dispatch({
      type: 'MODIFY_SEARCH_RESULTS',
      payload: results,
    });
    if (searchTrigger === 'themealdb' && results.meals.length === 1) {
      const { idMeal } = results.meals[0];
      history.push(`/comidas/${idMeal}`);
    }
    if (searchTrigger === 'thecocktaildb' && results.drinks.length === 1) {
      const { idDrink } = results.drinks[0];
      history.push(`/bebidas/${idDrink}`);
    }
  }

  return (
    <form action="">
      <label htmlFor="search-input">
        <input
          data-testid="search-input"
          onChange={ (event) => setInputValue(event.target.value) }
        />
      </label>
      <label htmlFor="checkBox">
        Ingrediente:
        <input
          name="checkBox"
          value="ingrediente"
          type="radio"
          data-testid="ingredient-search-radio"
          defaultChecked
          onClick={ (event) => setRadioOption(event.target.value) }
        />
        Nome:
        <input
          value="nome"
          name="checkBox"
          type="radio"
          data-testid="name-search-radio"
          onClick={ (event) => setRadioOption(event.target.value) }
        />
        Primeira Letra
        <input
          value="primeiraLetra"
          name="checkBox"
          type="radio"
          data-testid="first-letter-search-radio"
          onClick={ (event) => setRadioOption(event.target.value) }
        />
      </label>
      <input
        type="button"
        value="Buscar"
        data-testid="exec-search-btn"
        onClick={ () => checkBoxSearch() }
      />
    </form>
  );
}

SearchBar.propTypes = {
  searchTrigger: PropTypes.string.isRequired,
};
