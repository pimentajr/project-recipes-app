import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

import { searchById } from '../services/RequestFood';
import { searchDrinksAll } from '../services/RequestDrinks';

import { RequestHook } from '../Context/RequestHook';
import CardRecipe from '../components/CardRecipe';
import Clipboard from '../components/Clipboard';

function DetailsFood(props) {
  const { match: { params: { id } } } = props;
  const { initialItensDrink, setInitialItensDrink } = RequestHook();
  const [initialItemApi, setInitialItemApi] = useState([]);
  const limitItensRecomend = 6;

  useEffect(() => {
    async function getDetailsById() {
      const itemsFood = await searchById(id);
      setInitialItemApi(itemsFood);
    }

    async function getAllCategories() {
      const items = await searchDrinksAll();
      setInitialItensDrink(items);
    }

    getDetailsById();
    getAllCategories();
  }, [id, setInitialItensDrink]);

  function renderIngrediente(food) {
    const array = [];
    const limitItens = 15;
    for (let numero = 1; numero <= limitItens; numero += 1) {
      if (food[`strIngredient${numero}`] !== null
        && food[`strIngredient${numero}`] !== '') {
        array.push(
          <li
            data-testid={ `${numero - 1}-ingredient-name-and-measure` }
          >
            { `${food[`strIngredient${numero}`]} ` }
            { (food[`strMeasure${numero}`] !== null
              && food[`strMeasure${numero}`] !== '')
              ? <span>{ `${food[`strMeasure${numero}`]}` }</span>
              : '' }
          </li>,
        );
      }
    }
    return array;
  }

  // const startRecipeButton = () => (
  //   <button
  //     data-testid="start-recipe-btn"
  //     className="start-recipe-btn"
  //     type="button"
  //   >
  //     Iniciar Receita
  //   </button>
  // );

  return (
    (!initialItemApi)
      ? (<p>Loading...</p>)
      : initialItemApi.map((meal, index) => (
        <div key={ index } className="details-page">
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
          <ReactPlayer
            controls
            data-testid="video"
            url={ meal.strYoutube }
            width="150"
            height="150"
          />
          <button
            className="buttons"
            type="button"
            data-testid="start-recipe-btn"
          >
            Start recipe
          </button>

          <Clipboard />

          <button
            className="buttons"
            type="button"
            data-testid="favorite-btn"
          >
            Favorite
          </button>
          <div className="recomendation-card">
            {
              initialItensDrink && initialItensDrink
                .slice(0, limitItensRecomend)
                .map((foodRecomend, indexRec) => (
                  <button
                    key={ indexRec }
                    type="button"
                    data-testid={ `${indexRec}-recomendation-card` }
                    className="recomendation-button"
                  >
                    <CardRecipe
                      key={ indexRec }
                      item={ foodRecomend }
                      index={ indexRec }
                    />
                  </button>
                ))
            }
          </div>
          <button
            data-testid="start-recipe-btn"
            className="start-recipe-btn"
            type="button"
          >
            Iniciar Receita
          </button>
          {/* { startRecipeButton() } */ }
        </div>
      ))
  );
}

DetailsFood.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default DetailsFood;
