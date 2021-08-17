import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAPI, getIds } from '../services';
import Ingredients from '../components/Ingredients';
import Recommendations from '../components/Recommendations';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import '../styles/Details.css';
import RecipeButton from '../components/RecipeButton';
import { Container } from '../styles';

function verifyState(type, id, inProgress) {
  if (!localStorage.inProgressRecipes) {
    localStorage.setItem(
      'inProgressRecipes', JSON.stringify({ cocktails: {}, meals: {} }),
    );
  }
  if (!localStorage.doneRecipes) localStorage.setItem('doneRecipes', '[]');
  const inProgressRecipes = JSON.parse(localStorage.inProgressRecipes);
  const key = (type === 'drink') ? 'cocktails' : 'meals';
  const doneRecipes = JSON.parse(localStorage.doneRecipes);
  if (inProgress) return 'inProgress';
  if (doneRecipes.some((e) => e.id === id)) return 'restart';
  if (Object.keys(inProgressRecipes[key]).some((e) => e === id)) return 'started';
  return null;
}

function setLocalStorage(newIngredient, id, similarName) {
  const storage = JSON.parse(localStorage.inProgressRecipes);
  const typeStorage = storage[similarName];
  typeStorage[id] = newIngredient;
  localStorage.setItem('inProgressRecipes', JSON.stringify(storage));
}

export default function Details({ type }) {
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [state, setState] = useState(null);
  const { id, inProgress } = useParams();

  useEffect(() => {
    async function asyncFunction() {
      const newRecipe = await fetchAPI[type].getById(id);
      const recipeIds = getIds(type, newRecipe[0]);
      setRecipe(recipeIds);
      const storage = JSON.parse(
        localStorage.inProgressRecipes,
      )[recipeIds.similarName][recipeIds.id];
      if (storage) {
        setIngredients(storage);
      } else {
        setIngredients(recipeIds.ingredients);
      }
    }
    asyncFunction();
  }, [id, setRecipe, type]);
  useEffect(() => setState(verifyState(type, id, inProgress)), [id, type, inProgress]);
  useEffect(() => {
    if (recipe && inProgress) {
      setLocalStorage(ingredients, recipe.id, recipe.similarName);
    }
  }, [recipe, ingredients, inProgress]);

  if (recipe) {
    const {
      category, name, image, video, instructions, reverseType, type: drinkOrFood,
    } = recipe;
    return (
      <div>
        <img
          data-testid="recipe-photo"
          src={ image }
          alt={ name }
          className="details-img"
        />
        <div className="d-flex justify-content-between p-2">
          <div>
            <h2 data-testid="recipe-title">{ name }</h2>
            <h4 className="text-secondary" data-testid="recipe-category">{ category }</h4>
          </div>
          <div className="d-flex">
            <ShareButton type={ drinkOrFood } id={ id } dataTestid="share-btn" />
            <FavoriteButton
              recipe={ recipe }
              dataTestid="favorite-btn"
            />
          </div>
        </div>
        <h3 className="ml-2"> Ingredientes </h3>
        <Ingredients
          ingredients={ ingredients }
          setIngredients={ setIngredients }
          inProgress={ inProgress }
        />
        <h3 className="ml-2">Instructions</h3>
        <div className="bg-light p-2 mx-3 rounded border">
          <p data-testid="instructions">{ instructions }</p>
        </div>
        {(video) && (
          <div>
            <h3 className="ml-2">Vídeo</h3>
            <div
              className="d-flex justify-content-center bg-light p-2 mx-3 rounded border"
            >
              <iframe src={ video } title="Instruções" data-testid="video" />
            </div>
          </div>
        )}

        <h3 className="mb-2 ml-2"> Recomendadas </h3>
        <Recommendations type={ reverseType } />
        <RecipeButton
          state={ state }
          recipe={ recipe }
          ingredients={ ingredients }
          setIngredients={ setIngredients }
        />
      </div>
    );
  }
  return (
    <Container white>
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </Container>
  );
}

Details.propTypes = {
  type: PropTypes.string.isRequired,
};
