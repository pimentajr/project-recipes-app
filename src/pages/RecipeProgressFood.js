import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { searchById } from '../services/RequestFood';
import '../styles/drink.css';

function RecipeProgressFood(props) {
  const { match: { params: { id } } } = props;
  const [initialItemApi, setInitialItemApi] = useState([]);
  const [changeInputFood, setChangeInputFood] = useState(false);
  const [changeInputFoodChecked, setchangeInputFoodChecked] = useState('');

  useEffect(() => {
    async function getDetailsById() {
      const itemsFood = await searchById(id);
      setInitialItemApi(itemsFood);
    }

    getDetailsById();
  }, [id]);

  function isCheckedFood(numero) {
    setChangeInputFood(() => !changeInputFood);
    if (changeInputFood === false) {
      setchangeInputFoodChecked('checked');
      localStorage.setItem('inProgressRecipes', JSON.stringify(numero));
    } else {
      setchangeInputFoodChecked('');
      localStorage.removeItem('inProgressRecipes');
    }
  }

  function renderIngrediente(food) {
    const array = [];
    const limitItens = 15;
    for (let numero = 1; numero <= limitItens; numero += 1) {
      if (food[`strIngredient${numero}`] !== null
        && food[`strIngredient${numero}`] !== '') {
        array.push(
          <div>
            <label
              htmlFor={ numero }
              data-testid={ `${numero}-ingredient-step` }
              onChange={ () => isCheckedFood(`${numero - 1}-ingredient-step`) }
              className={ changeInputFoodChecked }
            >
              <input
                type="checkbox"
              />
              { `${food[`strIngredient${numero}`]} ` }
              { (food[`strMeasure${numero}`] !== null
              && food[`strMeasure${numero}`] !== '')
                ? <span>{ `${food[`strMeasure${numero}`]}` }</span>
                : '' }
            </label>
          </div>,
        );
      }
    }
    return array;
  }

  return (
    initialItemApi && initialItemApi.map((meal, index) => (
      <div key={ index }>
        <img
          data-testid="recipe-photo"
          src={ meal.strMealThumb }
          alt={ meal.strMeal }
          width="50px"
        />
        <h2 data-testid="recipe-title">{ meal.strMeal }</h2>
        <h4 data-testid="recipe-category">
          { meal.strCategory }
        </h4>
        <div>
          <h3>Ingredientes</h3>
          { renderIngrediente(meal) }
        </div>
        <h3>Instruções</h3>
        <p data-testid="instructions">{ meal.strInstructions }</p>
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

RecipeProgressFood.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default RecipeProgressFood;
