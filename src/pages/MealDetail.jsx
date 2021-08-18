import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import RecipeVideo from '../components/recipevideo/RecipeVideo';
// import RecommendedRecipes from '../components/recommendedrecipes/RecommendedRecipes';

export default function MealDetail() {
  const params = useParams();
  // const history = useHistory();

  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    (async function fetchApiById() {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`;
      const request = await fetch(url);
      const data = await request.json();
      setRecipe(data.meals[0]);
    }());
  }, [recipe, setRecipe, params]);

  const {
    strMeal,
    strMealThumb,
    strYoutube,
    strInstructions,
    strCategory,
  } = recipe;

  return (
    <div>
      <img src={ strMealThumb } alt={ strMeal } />
      <h2>{strMeal}</h2>
      {/* shareButton */}
      {/* favoritesButton */}
      <p>{strCategory}</p>
      {/* listIngredients */}
      <p>{strInstructions}</p>
      <RecipeVideo strYoutube={ strYoutube } />
      {/* <RecommendedRecipes category={ strCategory } type="meals" page="meal" /> */}
      <button type="button">Iniciar receita</button>
    </div>
  );
}
