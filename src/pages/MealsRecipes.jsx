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
    setCategory('meal');
    setFormat('meals');
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
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${filter}`;
        const request = await fetch(url);
        const data = await request.json();
        setRecipes(data.meals);
      }());
    }
  }, [filter]);

  return (
    <div>
      <Header pageTitle="Comidas" itHasNotSearchButton={ false } />
      <main>
        {
          categoryButtons
          && categoryButtons.map((button, index) => (
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
      <Footer />
    </div>
  );
}
