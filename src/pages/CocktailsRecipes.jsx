import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { useRecipes } from '../contexts/RecipesContext';
import Header from '../components/header/Header';
import RecipeCard from '../components/recipecard/RecipeCard';
import Footer from '../components/footer/Footer';

export default function MealsRecipes() {
  const { recipes, setRecipes, setCategory, setFormat } = useRecipes();

  useEffect(() => {
    setCategory('cocktail');
    setFormat('drinks');
  }, [setCategory, setFormat]);

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
      <Header pageTitle="Bebidas" itHasNotSearchButton={ false } />
      <main>
        {
          recipes
          && (recipes.length === 1
            ? <Redirect to={ `/bebidas/${recipes[0].idDrink}` } />
            : recipes.map((recipe, index) => (
              <RecipeCard
                key={ index }
                index={ index }
                recipeTitle={ recipe.strDrink }
                imagePath={ recipe.strDrinkThumb }
              />
            )))
        }
      </main>
      <Footer />
    </div>
  );
}
