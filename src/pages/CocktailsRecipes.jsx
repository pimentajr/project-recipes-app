import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { useRecipes } from '../contexts/RecipesContext';
import Header from '../components/header/Header';
import RecipeCard from '../components/recipecard/RecipeCard';
import Footer from '../components/footer/Footer';

export default function MealsRecipes() {
  const { recipes, categoryButtons, setRecipes, setCategory, setFormat } = useRecipes();
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setCategory('cocktail');
    setFormat('drinks');
    setRecipes([]);
  }, [setCategory, setFormat, setRecipes]);

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

  useEffect(() => {
    if (filter) {
      (async function filterByCategory() {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter}`;
        const request = await fetch(url);
        const data = await request.json();
        setRecipes(data.drinks);
      }());
    }
  }, [filter, setRecipes]);

  return (
    <div>
      <Header pageTitle="Bebidas" itHasNotSearchButton={ false } />
      <main>
        {
          categoryButtons.map((button, index) => (
            <button
              type="button"
              key={ index }
              data-testid={ `${button.strCategory}-category-filter` }
              value={ button.strCategory }
              onClick={ (event) => setFilter(event.target.value) }
            >
              {button.strCategory}
            </button>
          ))
        }
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
