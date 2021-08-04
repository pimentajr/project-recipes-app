import React from 'react';
import RenderCard from './RenderCard';

function RecipeList() {
  const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {recipes.lenght > 0
        ? null : <RenderCard recipes={ recipes } />}
    </div>
  );
}

export default RecipeList;
