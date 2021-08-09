import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import './RecipesFoods.css';
import CardRecipes from '../Components/CardRecipes';
import FilterButtons from '../Components/FilterButtons';
// import MyContext from '../Context/MyContext';

export default function RecipesFood() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const getApi = async () => {
      const endPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(endPoint);
      const results = await response.json();
      const { meals } = results;
      setRecipes(meals);
    };
    getApi();
  }, []);
  const renderCardRecipes = () => {
    const showMaxRecipes = 12;
    if (recipes) {
      const filteredRecipe = recipes.filter(
        (meals, index) => index < showMaxRecipes,
      );
      return filteredRecipe;
    }
  };
  return (
    <div>
      <Header className="title" title="Comidas" searchIconAppears />
      <FilterButtons />
      <div className="cardlist">
        {renderCardRecipes().map((recp, index) => (
          <Link 
            className="link"
            key={ index }
            to="/details-recipe"
          >
            <CardRecipes
              key={ index }
              index={ index }
              thumb={ recp.strMealThumb }
              title={ recp.strMeal }
            />
          </Link>))}
      </div>
      <Footer />
    </div>
  );
}
