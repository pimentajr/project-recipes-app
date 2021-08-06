import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { setRecipeList } from '../action';
import RecipesContext from '../context/RecipesContext';
import { searchByFirstLetter, searchByIngredient, searchByName } from '../services';
import '../styles/SearchBar.css';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [radioValue, setRadioValue] = useState('');
  const [foodList, setFoodList] = useState([]);
  const [foodType, setFoodType] = useState('');
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { setDataRecipes } = useContext(RecipesContext);

  useEffect(() => {
    const type = pathname === '/bebidas' ? 'drinks' : 'meals';
    setFoodType(type);
  }, []);

  const searchRecipes = async () => {
    let api;
    if (radioValue === 'Ingrediente') {
      api = await searchByIngredient(searchQuery, pathname);
    } else if (radioValue === 'Nome') {
      api = await searchByName(searchQuery, pathname);
    } else {
      api = await searchByFirstLetter(searchQuery, pathname);
    }
    if (api && api[foodType] !== null) {
      setFoodList(api[foodType]);
      setDataRecipes(api[foodType]);
      dispatch(setRecipeList(api[foodType]));
    } else {
      setDataRecipes([]);
      window.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  };

  const setValueAndChecked = ({ target }) => {
    setRadioValue(target.value);
    const checked = document.querySelector('.checked');
    target.classList.add('checked');
    target.setAttribute('checked', true);
    if (checked) {
      checked.setAttribute('checked', false);
      checked.classList.remove('checked');
    }
  };

  return (
    <div className="searchBar-container">
      <input
        type="text"
        data-testid="search-input"
        placeholder="Buscar Receita"
        value={ searchQuery }
        onChange={ ({ target }) => setSearchQuery(target.value) }
      />
      <div className="searchBar-radios">
        <label htmlFor="ingredient">
          <input
            type="radio"
            id="ingredient"
            name="search-option"
            data-testid="ingredient-search-radio"
            value="Ingrediente"
            onChange={ setValueAndChecked }
          />
          Ingrediente
        </label>
        <label htmlFor="name">
          <input
            type="radio"
            id="name"
            name="search-option"
            data-testid="name-search-radio"
            value="Nome"
            onChange={ setValueAndChecked }
          />
          Nome
        </label>
        <label htmlFor="firstLetter">
          <input
            type="radio"
            id="firstLetter"
            name="search-option"
            data-testid="first-letter-search-radio"
            value="Primeira_Letra"
            onChange={ setValueAndChecked }
          />
          Primeira Letra
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        className="searchBar-btn"
        onClick={ searchRecipes }
      >
        Buscar
      </button>
    </div>
  );
}
