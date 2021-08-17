import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RenderRecomendations from '../components/RenderRecomendations';
import {
  getRecipes,
} from '../redux/slices/fetchReceitas';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/blackHeartIcon.svg';
import nonFavoriteIcon from '../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

const getIngredientsAndMeasures = (type, recipe) => {
  const keys = Object.keys(recipe);
  const values = Object.values(recipe);
  const indexes = keys.reduce(((arr, key, index) => {
    if (key.includes(type)) return [...arr, index];
    return arr;
  }), []);
  const result = indexes.reduce(((arr, index) => {
    if (!['', ' ', null].includes(values[index])) return [...arr, values[index]];
    return arr;
  }), []);
  return result;
};

const getIngredients2 = (recipe) => {
  const ingredients = getIngredientsAndMeasures('strIngredient', recipe);
  console.log(ingredients);
  const measure = getIngredientsAndMeasures('strMeasure', recipe);
  console.log(measure);
  return ingredients.map((ingredient, index) => (
    <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
      { `${ingredient} ${measure[index] || ''}` }
    </li>
  ));
};

const deleteFavorite = (idRecipe) => {
  const arrayStoraged = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const arrayToStorage = arrayStoraged.filter(({ id }) => id !== idRecipe);
  localStorage.setItem('favoriteRecipes', JSON.stringify(arrayToStorage));
};

const setFavorite = (recipe) => {
  const { strDrinkThumb, strDrink, idDrink, strCategory, strAlcoholic } = recipe;

  const objToStorage = {
    id: idDrink,
    type: 'bebida',
    area: '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strDrinkThumb,
  };
  const arrayStoraged = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const arrayToStorage = [...arrayStoraged, objToStorage];
  localStorage.setItem('favoriteRecipes', JSON.stringify(arrayToStorage));
};

const verifyFavorite = (idRecipe) => {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  return favorites.some(({ id }) => id === idRecipe);
};

const checkInProgress = (id) => {
  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
    cocktails: {},
    meals: {},
  };
  const toCompare = inProgress.cocktails || {};
  // return toCompare.length > 0;
  return Object.keys(toCompare).some((recipeId) => recipeId === id);
};

function DetalhesBebidas() {
  const [recipe, setRecipe] = useState({});
  const [copyOk, setCopyOk] = useState(false);
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState();
  const [isInProgress, setIsInProgress] = useState(false);

  const fetchUrl = (url) => {
    fetch(url)
      .then((data) => data.json())
      .then((recipeData) => setRecipe(recipeData.drinks[0]));
  };

  useEffect(() => {
    const { pathname } = window.location;
    const recipeID = pathname.split('/')[2];
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeID}`;
    fetchUrl(URL);
    dispatch(getRecipes('foods'));
    setIsFavorite(verifyFavorite(recipeID));
    setIsInProgress(checkInProgress(recipeID));
  }, []);

  if (Object.keys(recipe).length === 0) {
    return <p>Loading..</p>;
  }

  const guide = () => {
    if (isFavorite) {
      deleteFavorite(recipe.idDrink);
      setIsFavorite(false);
    } else {
      setFavorite(recipe);
      setIsFavorite(true);
    }
  };

  return (
    <div>
      <img
        src={ recipe.strDrinkThumb }
        alt={ recipe.strDrink }
        data-testid="recipe-photo"
        width="100%"
      />
      <h1 data-testid="recipe-title">{ recipe.strDrink }</h1>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => {
          copy(window.location);
          setCopyOk(true);
        } }
      >
        <img src={ shareIcon } alt="share" />
      </button>
      { copyOk && <p>Link copiado!</p> }
      <button
        type="button"
        onClick={ guide }
      >
        <img
          src={ isFavorite ? favoriteIcon : nonFavoriteIcon }
          data-testid="favorite-btn"
          alt="share"
        />
      </button>
      <h5 data-testid="recipe-category">{ recipe.strAlcoholic }</h5>
      <ol>
        { getIngredients2(recipe) }
      </ol>
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      <Link to={ `/bebidas/${recipe.idDrink}/in-progress` }>
        <button
          type="button"
          data-testid="start-recipe-btn"
          style={ {
            position: 'fixed',
            bottom: '0',
          } }
        >
          { isInProgress ? 'Continuar Receita' : 'Iniciar Receita' }
        </button>
      </Link>
      <RenderRecomendations typeReco="comidas" />
    </div>
  );
}

// Arrumar dinâmica do botão

export default DetalhesBebidas;
