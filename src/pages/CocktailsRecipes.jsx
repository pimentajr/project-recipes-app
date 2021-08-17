import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { useRecipes } from '../contexts/RecipesContext';
import Header from '../components/header/Header';

export default function MealsRecipes() {
  const { recipes, setCategory, setFormat } = useRecipes();

  useEffect(() => {
    setCategory('cocktail');
    setFormat('drinks');
  }, []);

  useEffect(() => {
    if (recipes === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }, [recipes]);

  console.log(recipes);
  return (
    <div>
      <Header pageTitle="Bebidas" itHasNotSearchButton={ false } />
      <main>
        {
          recipes
          && (recipes.length === 1
            ? <Redirect to={ `/bebidas/${recipes[0].idDrink}` } />
            : recipes.map((recipe, index) => (
              <p key={ index }>olá</p>
            )))
        }
      </main>
    </div>
  );
}
