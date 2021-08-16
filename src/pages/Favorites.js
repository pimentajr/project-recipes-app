import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import FavoriteCards from '../components/FavoriteCards';
import favoriteFilter from '../components/FavoriteFilter';

export default function Favorites() {
  const [favoriteRecipe, setfavoriteRecipe] = useState([]);
  const [filter, setFilter] = useState('all');
  const [fetching, setfetching] = useState(true);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    if (localStorage.favoriteRecipes && fetching) {
      const listFromLS = JSON.parse(localStorage.favoriteRecipes);
      setfavoriteRecipe(listFromLS);
      setfetching(false);
    }
  }, [fetching]);
  useEffect(() => {
    if (update) {
      setfavoriteRecipe(JSON.parse(localStorage.favoriteRecipes));
    }
    setUpdate(false);
  }, [update]);
  useEffect(() => {
    favoriteFilter(setfavoriteRecipe, filter);
  }, [filter]);
  function renderFavorites() {
    return (
      <div className="details-body">
        <div>
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => setFilter('all') }
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ () => setFilter('food') }
          >
            Food
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => setFilter('drink') }
          >
            Drinks
          </button>
        </div>
        <FavoriteCards list={ favoriteRecipe } func={ setUpdate } />
      </div>
    );
  }
  return (
    <main>
      <Header haveSearchBtn={ false } title="Receitas Favoritas" />
      { favoriteRecipe !== [] ? renderFavorites() : <p>Nenhuma receita favoritada</p> }
    </main>
  );
}
