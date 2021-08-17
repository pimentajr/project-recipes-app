import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { useRecipes } from '../contexts/RecipesContext';
import Header from '../components/header/Header';

export default function MealsRecipes() {
  const { recipes, setCategory, setFormat } = useRecipes();

  useEffect(() => {
    setCategory('meal');
    setFormat('meals');
  }, []);

  useEffect(() => {
    if (!recipes) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }, [recipes]);

  return (
    <div>
      <Header pageTitle="Comidas" itHasNotSearchButton={ false } />
      <main>
        {
          recipes
          && (recipes.length === 1
            ? <Redirect to={ `/comidas/${recipes[0].idMeal}` } />
            : recipes.map((recipe, index) => (
              <p key={ index }>olá</p>
            )))
        }
      </main>
    </div>
  );
}
