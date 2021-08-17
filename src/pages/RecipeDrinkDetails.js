import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import RecomendationRecipesCards from '../components/RecomendationRecipesCards';
import shareIcon from '../images/shareIcon.svg';
import DrinkFavoriteButton from '../components/DrinkFavoriteButton';
import './css/RecipeDetails.css';

function RecipeDrinkDetails({ match, location }) {
  const [recipe, setRecipe] = useState('');

  const { params } = match;
  const { pathname } = location;
  const { id } = params;

  console.log(recipe);

  useEffect(() => {
    fetch(`${'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='}${id}`)
      .then((response) => response.json())
      .then((result) => setRecipe(result));
  }, [id]);

  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  useEffect(() => {
    if (recipe && recipe.drinks) {
      const recipeKeys = Object.keys(recipe.drinks[0]);

      const ingredientsKeys = [];
      const measureKeys = [];
      recipeKeys.forEach((key) => {
        if (key.includes('strIngredient')) ingredientsKeys.push(key);
        if (key.includes('strMeasure')) measureKeys.push(key);
      });

      const recipeIngredints = [];
      ingredientsKeys.forEach((ingredient) => {
        recipeIngredints.push(recipe.drinks[0][ingredient]);
      });

      const recipeMeasure = [];
      measureKeys.forEach((measure) => {
        recipeMeasure.push(recipe.drinks[0][measure]);
      });

      const filteredIngredints = recipeIngredints.filter((ingredient) => ingredient);
      setIngredients(filteredIngredints);

      const filteredMeasures = recipeMeasure.filter((measure) => measure);
      setMeasures(filteredMeasures);
    }
  }, [recipe]);

  const [hidden, setHidden] = useState(true);

  function renderDrinkDetails() {
    if (recipe.drinks) {
      return (
        <div className="supply-card-container">
          <div className="supply-card">
            <div className="title-container">
              <h1 data-testid="recipe-title">{ recipe.drinks[0].strDrink }</h1>
              <h3 data-testid="recipe-category">
                {recipe.drinks[0].strAlcoholic}
              </h3>
            </div>
            <div className="img-buttons-container">
              <img
                className="supply-img"
                data-testid="recipe-photo"
                src={ recipe.drinks[0].strDrinkThumb }
                alt={ recipe.drinks[0].strDrink }
              />
              <button
                onClick={ () => {
                  alert('Link copiado!');
                  copy(`http://localhost:3000${pathname}`);
                  setHidden(false);
                } }
                type="button"
                data-testid="share-btn"
              >
                <img src={ shareIcon } alt="shareIcon" />
              </button>
              {!hidden && <div>Link copiado!</div>}
              <DrinkFavoriteButton recipe={ recipe.drinks[0] } />
            </div>
            <div className="ingredients-container">
              <div className="title-container">
                <h3>Ingredientes</h3>
              </div>
              <ul>
                {ingredients.map((ingredientDrink, index) => (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {ingredientDrink}
                    {' '}
                    <strong>{measures[index]}</strong>
                  </li>
                ))}
              </ul>
            </div>
            <div className="intructions-container">
              <div className="title-container">
                <h3>Instruções</h3>
              </div>
              <p data-testid="instructions">
                {recipe.drinks[0].strInstructions}
              </p>
            </div>
            <div className="recomendation-container">
              <div className="title-container">
                <h3>Recomendações</h3>
              </div>
              <div>
                <RecomendationRecipesCards identifier="bebidas" />
              </div>
            </div>
            <Link to={ `${pathname}/in-progress` }>
              <button
                className="start-recipe"
                type="button"
                data-testid="start-recipe-btn"
              >
                Continuar Receita
              </button>
            </Link>
          </div>
        </div>
      );
    }
  }

  return (
    <div>
      {!recipe ? <div>Loading...</div> : renderDrinkDetails()}
    </div>
  );
}

export default RecipeDrinkDetails;

RecipeDrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
