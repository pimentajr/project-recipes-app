import React from 'react';
import PropTypes from 'prop-types';

import './RecipeCard.css';

export default function RecipeCard({ recipeTitle, imagePath, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` } className="cardContainer">
      <img src={ imagePath } alt={ recipeTitle } data-testid={ `${index}-card-img` } />
      <h2 data-testid={ `${index}-card-name` }>{recipeTitle}</h2>
    </div>
  );
}

RecipeCard.propTypes = {
  recipeTitle: PropTypes.string.isRequired,
  imagePath: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
