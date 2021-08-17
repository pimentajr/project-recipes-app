import React from 'react';
import { Link } from 'react-router-dom';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';

export default function FavoriteCard({ recipe, index }) {
  if (recipe) {
    const path = `/${recipe.type}s/${recipe.id}`;
    const category = recipe.area
      ? (`${recipe.area} - ${recipe.category}`) : recipe.alcoholicOrNot;
    return (
      <div>
        <div>
          <Link to={ path }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
              width="100px"
            />
            <h3 data-testid={ `${index}-horizontal-top-text` }>
              { category }
            </h3>
            <h2 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h2>
          </Link>
          <ShareButton
            dataTestid={ `${index}-horizontal-share-btn` }
            type={ recipe.type }
            id={ recipe.id }
          />
        </div>
        <button type="button" onClick={ () => window.location.reload() }>
          <FavoriteButton
            recipe={ recipe }
            drinkOrFood={ recipe.type }
            dataTestid={ `${index}-horizontal-favorite-btn` }
          />
        </button>
      </div>
    );
  }
}
