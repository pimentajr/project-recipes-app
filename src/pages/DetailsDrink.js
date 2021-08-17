import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { searchId } from '../services/RequestDrinks';
import { searchFoodsAll } from '../services/RequestFood';

import { RequestHook } from '../Context/RequestHook';
import CardRecipe from '../components/CardRecipe';
import Clipboard from '../components/Clipboard';

function DetailsDrink(props) {
  const { match: { params: { id } } } = props;
  const { initialItensFood, setInitialItensFood } = RequestHook();
  const [initialItemApi, setInitialItemApi] = useState([]);
  const limitItensRecomend = 6;

  useEffect(() => {
    async function getDetailsById() {
      const itemsDrink = await searchId(id);
      setInitialItemApi(itemsDrink);
    }

    async function getAllCategories() {
      const items = await searchFoodsAll();
      setInitialItensFood(items);
    }

    getDetailsById();
    getAllCategories();
  }, [id, setInitialItensFood]);

  function renderIngrediente(drink) {
    const array = [];
    const limitItens = 15;

    for (let numero = 1; numero <= limitItens; numero += 1) {
      if (drink[`strIngredient${numero}`] !== null
        && drink[`strIngredient${numero}`] !== '') {
        array.push(
          <li
            data-testid={ `${numero - 1}-ingredient-name-and-measure` }
          >
            { `${drink[`strIngredient${numero}`]} ` }
            { (drink[`strMeasure${numero}`] !== null
              && drink[`strMeasure${numero}`] !== '')
              ? <span>{ `${drink[`strMeasure${numero}`]}` }</span>
              : '' }
          </li>,
        );
      }
    }
    return array;
  }

  return (
    (!initialItemApi)
      ? (<p>Loading...</p>)
      : initialItemApi.map((drink, index) => (
        <div key={ index } className="details-page">
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
              initialItensFood && initialItensFood
                .slice(0, limitItensRecomend)
                .map((drinkRecomend, indexRec) => (
                  <button
                    key={ indexRec }
                    type="button"
                    data-testid={ `${indexRec}-recomendation-card` }
                    className="recomendation-button"
                  >
                    <CardRecipe
                      key={ indexRec }
                      item={ drinkRecomend }
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
        </div>
      ))
  );
}

DetailsDrink.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default DetailsDrink;
