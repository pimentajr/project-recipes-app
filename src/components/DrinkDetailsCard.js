import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
// import DoneRecipeToLSDrink from './DoneRecipeToLSDrink';
import ShareBtn from './ShareBtn';
import FavoriteBtn from './FavoriteBtn';
import DrinkCarrossel from './DrinkCarrossel';
import FetchApi from '../services/ApiFetch';

function DrinkDetailsCard({ details, mealIngredients, mealMeasure, id }) {
  const dispatch = useDispatch();
  const [recomendation, setRecomendation] = useState();
  const [doneRecipe, setDoneRecipe] = useState();
  const [inProgress, setInProgress] = useState();
  const [nada, setnada] = useState(false);
  const history = useHistory();
  console.log(nada);
  useEffect(() => {
    const drinkID = id;
    if (localStorage.inProgressRecipes
      && JSON.parse(localStorage.inProgressRecipes).cocktails
      && Object.keys(JSON.parse(localStorage.inProgressRecipes).cocktails)
        .some((recipe) => recipe === drinkID)) {
      setInProgress(true);
    }
  }, []);

  useEffect(() => {
    if (details) {
      dispatch({
        type: 'SEND_DETAILS_TO_STORE',
        details,
      });
    }
  }, [details]);

  useEffect(() => {
    async function getRecomendations() {
      const qty = 6;
      const response = await FetchApi('themealdb', 'nome', '');
      const recomendationsList = response.meals.slice(0, qty);
      setRecomendation(recomendationsList);
    }
    const drinkID = id;
    if (localStorage.doneRecipes
      && JSON.parse(localStorage.doneRecipes).some((recipe) => recipe.id === drinkID)) {
      setDoneRecipe(true);
    }
    getRecomendations();
  }, []);

  function renderDetails() {
    return (
      <div className="details-body">
        <img
          alt="logo"
          src={ details[0].strDrinkThumb }
          data-testid="recipe-photo"
          width="350px"
          height="300px"
        />
        <h3 data-testid="recipe-title">{ details[0].strDrink }</h3>
        <div className="details-btn-container">
          <FavoriteBtn
            details={ details }
            gatilho="bebida"
            id={ id }
            index={ -1 }
            update={ setnada }
          />
          <ShareBtn />
        </div>
        <h4>
          Category:
          { details[0].strCategory }
        </h4>
        <h4 data-testid="recipe-category">{details[0].strAlcoholic}</h4>
        <h4>Ingredients:</h4>
        { mealIngredients ? mealIngredients.map((item, index) => (
          <h5
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            { `${item} - ${mealMeasure[index]}` }
          </h5>
        )) : '' }
        <h4>Instructions:</h4>
        <div data-testid="instructions">
          <p>{ details[0].strInstructions }</p>
        </div>
      </div>
    );
  }
  return (
    <div className="details-container">
      { details ? renderDetails() : 'Loading...'}
      <DrinkCarrossel recomendation={ recomendation } />
      <br />
      <button
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => history.push(`/bebidas/${id}/in-progress`) }
        style={ { position: 'fixed',
          bottom: '0px',
          width: '100%',
          visibility: doneRecipe ? 'hidden' : 'visible',
        } }
      >
        {inProgress ? 'Continuar Receita' : 'Iniciar Receita'}
      </button>
    </div>
  );
}

export default DrinkDetailsCard;
DrinkDetailsCard.propTypes = {
  details: PropTypes.func,
  mealIngredients: PropTypes.func,
  mealMeasure: PropTypes.func,
}.isRequired;
