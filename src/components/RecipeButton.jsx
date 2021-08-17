import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { RecipeStateButton } from '../styles';

export default function RecipeButton({ state, recipe, ingredients, setIngredients }) {
  const history = useHistory();
  const { pathname } = history.location;
  const verify = (ingredients) ? ingredients.some((e) => e.checked === false) : false;
  function setDoneRecipe() {
    const date = new Date();
    const {
      category, name, image, type, tags, id, area,
    } = recipe;
    const obj = {
      id,
      type,
      area,
      category: (type === 'comida') ? category : '',
      alcoholicOrNot: (type === 'comida') ? '' : category,
      name,
      image,
      doneDate: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
      tags,
    };
    const doneRecipes = JSON.parse(localStorage.doneRecipes);
    localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, obj]));
  }
  function restartRecipe() {
    const newIngredients = ingredients.map(({ name, measure }) => (
      { name, measure, checked: false }
    ));
    setIngredients(newIngredients);
    const doneRecipes = JSON.parse(localStorage.doneRecipes);
    const filterRecipes = doneRecipes.filter(
      (element) => element.id !== recipe.id,
    );
    localStorage.setItem('doneRecipes', JSON.stringify(filterRecipes));
  }
  switch (state) {
  case 'started':
    return (
      <RecipeStateButton
        type="button"
        className="startButton"
        data-testid="start-recipe-btn"
        onClick={ () => history.push(`${pathname}/in-progress`) }
      >
        Continuar Receita
      </RecipeStateButton>
    );
  case 'inProgress':
    return (
      <Link to="/receitas-feitas">
        <RecipeStateButton
          data-testid="finish-recipe-btn"
          className="startButton"
          disabled={ verify }
          onClick={ () => setDoneRecipe() }
        >
          Finalizar receita
        </RecipeStateButton>
      </Link>
    );
  case 'restart':
    return (
      <RecipeStateButton
        className="startButton"
        onClick={ () => { restartRecipe(); history.push(`${pathname}/in-progress`); } }
      >
        Refazer Receita
      </RecipeStateButton>
    );
  default:
    return (
      <RecipeStateButton
        className="startButton"
        data-testid="start-recipe-btn"
        onClick={ () => history.push(`${pathname}/in-progress`) }
      >
        Iniciar Receita
      </RecipeStateButton>
    );
  }
}

RecipeButton.propTypes = {
  recipe: PropTypes.shape({
    area: PropTypes.string,
    category: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  state: PropTypes.string,
  ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
  setIngredients: PropTypes.func.isRequired,
};

RecipeButton.defaultProps = {
  state: '',
};
