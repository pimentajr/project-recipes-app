import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ShareBtn from './ShareBtn';
import FavoriteBtn from './FavoriteBtn';
import FetchApi from '../services/ApiFetch';
import FoodCarrossel from './FoodCarrossel';
import foodVideo from './FoodVideo';

function FoodDetailsCard({ details, mealIngredients, mealMeasure, id }) {
  const [recomendation, setRecomendation] = useState();
  const [doneRecipe, setDoneRecipe] = useState();
  const [inProgress, setInProgress] = useState();
  const [nada, setnada] = useState(false);
  const history = useHistory();
  console.log(nada);
  useEffect(() => {
    const foodID = id;
    if (localStorage.inProgressRecipes
      && JSON.parse(localStorage.inProgressRecipes).meals
      && Object.keys(JSON.parse(localStorage.inProgressRecipes).meals)
        .some((recipe) => recipe === foodID)) {
      setInProgress(true);
    }
  }, []);

  useEffect(() => {
    async function getRecomendations() {
      const qty = 6;
      const response = await FetchApi('thecocktaildb', 'nome', '');
      const recomendationsList = response.drinks.slice(0, qty);
      setRecomendation(recomendationsList);
    }
    const foodID = id;
    if (localStorage.doneRecipes
      && JSON.parse(localStorage.doneRecipes).some((recipe) => recipe.id === foodID)) {
      setDoneRecipe(true);
    }
    getRecomendations();
  }, []);

  function renderDetails() {
    return (
      <div className="details-body">
        <img
          alt="logo"
          src={ details[0].strMealThumb }
          data-testid="recipe-photo"
          width="350px"
          height="300px"
        />
        <h3 data-testid="recipe-title">{ details[0].strMeal }</h3>
        <div className="details-btn-container">
          <ShareBtn />
          <FavoriteBtn
            details={ details }
            gatilho="comida"
            id={ id }
            index={ -1 }
            update={ setnada }
          />
        </div>
        <h4 data-testid="recipe-category">
          Category:
          { details[0].strCategory }
        </h4>
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
        <p data-testid="instructions">{ details[0].strInstructions }</p>
        <h4>Vídeo</h4>
        { foodVideo(details) }
      </div>
    );
  }
  return (
    <div className="details-container">
      { details ? renderDetails() : 'Loading...'}
      <FoodCarrossel recomendation={ recomendation } />
      <br />
      <button
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => history.push(`/comidas/${id}/in-progress`) }
        style={ { position: 'fixed',
          bottom: '0px',
          width: '100%',
          left: '0px',
          visibility: doneRecipe ? 'hidden' : 'visible',
        } }
      >
        {inProgress ? 'Continuar Receita' : 'Iniciar Receita'}
      </button>
    </div>
  );
}

export default FoodDetailsCard;
FoodDetailsCard.propTypes = {
  details: PropTypes.func,
  mealIngredients: PropTypes.func,
  mealMeasure: PropTypes.func,
}.isRequired;
