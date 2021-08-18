import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { searchDrinkById } from '../services/RequestDrinks';
import { searchFoodsAll } from '../services/RequestFood';
import { RequestHook } from '../Context/RequestHook';
import Clipboard from '../components/Clipboard';

function DetailsDrink(props) {
  const { match: { params: { id } } } = props;
  const { initialItens, setInitialItens } = RequestHook();
  const [initialItemApi, setInitialItemApi] = useState([]);
  const limitItensRecomend = 6;

  async function getDetailsById() {
    const itemsDrink = await searchDrinkById(id);
    setInitialItemApi(itemsDrink);
  }

  async function getAllCategories() {
    const items = await searchFoodsAll();
    setInitialItens(items);
  }

  useEffect(() => {
    getDetailsById();
    getAllCategories();
  }, []);

  function renderCard(object, number) {
    return (
      <Link to={ `/comidas/${object.idMeal}` }>
        <button
          type="button"
          key={ number }
          data-testid={ `${number}-recomendation-card` }
          className="recomendation-button"
          hidden={ number > 1 }
        >
          <p data-testid={ `${number}-recomendation-title` }>{object.strMeal}</p>
          <img
            src={ object.strMealThumb }
            alt={ `${number}-card-name` }
            width="100px"
          />
        </button>
      </Link>
    );
  }

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
              initialItens && initialItens
                .slice(0, limitItensRecomend)
                .map((drinkRecomend, indexRec) => renderCard(drinkRecomend, indexRec))
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
