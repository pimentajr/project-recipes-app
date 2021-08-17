import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { useRecipes } from '../contexts/RecipesContext';
import Header from '../components/header/Header';
import RecipeCard from '../components/recipecard/RecipeCard';

export default function MealsRecipes() {
  const { recipes, setRecipes, setCategory, setFormat } = useRecipes();

  useEffect(() => {
    setCategory('meal');
    setFormat('meals');
  }, []);

  useEffect(() => {
    const maximumArrayLength = 12;
    if (recipes === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      return;
    }
    if (recipes.length > maximumArrayLength) {
      const maxRecipes = [];
      for (let index = 0; index < maximumArrayLength; index += 1) {
        maxRecipes.push(recipes[index]);
      }
      setRecipes(maxRecipes);
    }
  }, [recipes, setRecipes]);

  return (
    <div>
      <Header pageTitle="Comidas" itHasNotSearchButton={ false } />
      <main>
        {
          recipes
          && (recipes.length === 1
            ? <Redirect to={ `/comidas/${recipes[0].idMeal}` } />
            : recipes.map((recipe, index) => (
              <RecipeCard
                key={ index }
                index={ index }
                recipeTitle={ recipe.strMeal }
                imagePath={ recipe.strMealThumb }
              />
            )))
        }
      </main>
    </div>
  );
}
