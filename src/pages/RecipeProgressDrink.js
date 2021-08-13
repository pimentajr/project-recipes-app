import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { searchId } from '../services/RequestDrinks';
import '../styles/drink.css';

function RecipeProgressDrink(props) {
  const { match: { params: { id } } } = props;
  const [initialItemApi, setInitialItemApi] = useState([]);
  const [changeInput, setChangeInput] = useState(false);
  const [changeInputDrinkChecked, setchangeInputDrinkChecked] = useState('');

  async function getDetailsById() {
    const itemsDrink = await searchId(id);
    setInitialItemApi(itemsDrink);
  }

  useEffect(() => {
    getDetailsById();
  }, []);

  function isChecked() {
    setChangeInput(() => !changeInput);
    if (changeInput === false) {
      setchangeInputDrinkChecked('checked');
    } else {
      setchangeInputDrinkChecked('');
    }
  }

  function renderIngrediente(drink) {
    const array = [];
    const limitItens = 15;
    for (let numero = 1; numero <= limitItens; numero += 1) {
      if (drink[`strIngredient${numero}`] !== null
      && drink[`strIngredient${numero}`] !== '') {
        array.push(
          <div>
            <label
              htmlFor={ numero }
              data-testid={ `${numero}-ingredient-step` }
              onChange={ () => isChecked() }
              className={ changeInputDrinkChecked }
            >
              <input
                type="checkbox"
              />
              { `${drink[`strIngredient${numero}`]} ` }
              { (drink[`strMeasure${numero}`] !== null
              && drink[`strMeasure${numero}`] !== '')
                ? <span>{ `${drink[`strMeasure${numero}`]}` }</span>
                : '' }
            </label>
          </div>,
        );
      }
    }
    return array;
  }

  return (
    initialItemApi && initialItemApi.map((drink, index) => (
      <div key={ index }>
        <img
          data-testid="recipe-photo"
          src={ drink.strDrinkThumb }
          alt={ drink.strDrink }
          width="50px"
        />
        <h2 data-testid="recipe-title">{ drink.strDrink }</h2>
        <h4 data-testid="recipe-category">
          { drink.strAlcoholic }
        </h4>
        <div>
          <h3>Ingredientes</h3>
          { renderIngrediente(drink) }
        </div>
        <h3>Instruções</h3>
        <p data-testid="instructions">{ drink.strInstructions }</p>
        <button type="button" data-testid="share-btn">Share</button>
        <button type="button" data-testid="favorite-btn">Favorite</button>
        <button
          type="button"
          data-testid="finish-recipe-btn"
        >
          Finalizar Receita
        </button>
      </div>
    )));
}

RecipeProgressDrink.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default RecipeProgressDrink;
