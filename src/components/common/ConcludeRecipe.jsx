import React from 'react';
import { arrayOf, bool, func, string } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearProgress, setProgressDone } from
  '../../redux/actions/recipeProgressActions';
import '../../styles/components/concludeRecipe.css';

const ConcludeRecipe = ({
  addProgressDone,
  id,
  ingredients,
  recipeDone,
  recipeType,
  resetProgress }) => {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!inProgressRecipes) return (<span>Carregando botão...</span>);
  if (!inProgressRecipes[recipeType]) return (<span>Carregando botão...</span>);
  if (inProgressRecipes[recipeType][id] === undefined
        || inProgressRecipes[recipeType][id] === []
        || inProgressRecipes[recipeType][id] === null) {
    return (<span>Carregando ingredients...</span>);
  }
  if (inProgressRecipes[recipeType][id].length === ingredients.length) {
    addProgressDone();
  }
  const handleClick = () => {
    const inProgressRecipess = JSON.parse(localStorage.getItem('inProgressRecipes'));
    delete inProgressRecipess[recipeType][id];
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipess));
    resetProgress();
  };
  return (
    <Link
      to="/receitas-feitas"
    >
      <button
        className={ recipeDone ? 'recipe-done' : 'recipe-in-progress' }
        data-testid="finish-recipe-btn"
        onClick={ handleClick }
        type="button"
        disabled={ !recipeDone }
      >
        Finalizar receita
      </button>
    </Link>
  );
};

const mapStateToProps = ({ recipeProgressReducer }) => ({
  recipeDone: recipeProgressReducer.done,
});

const mapDispatchToProps = (dispatch) => ({
  addProgressDone: () => dispatch(setProgressDone()),
  resetProgress: () => dispatch(clearProgress()),
});

ConcludeRecipe.propTypes = ({
  id: string,
  ingredients: arrayOf(string),
  recipeDone: bool,
  recipeType: string,
  resetProgress: func,
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ConcludeRecipe);
