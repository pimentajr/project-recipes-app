import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FetchApi from '../services/ApiFetch';

export default function RecipesByLocation() {
  const [recipesFiltered, setrecipesFiltered] = useState([]);
  const [location, setLocation] = useState();
  const [locationName, setLocationName] = useState('');

  useEffect(() => {
    async function getIngredientsFromApi() {
      const response = await FetchApi('themealdb', '', '', 'locations');
      const response3 = await FetchApi('themealdb', locationName, '', 'location');
      const response4 = await FetchApi('themealdb', 'nome', '', '');
      const get = response.meals.map((e) => e.strArea);
      const get2 = response3.meals;
      setLocation(get);
      setrecipesFiltered(get2);
      if (locationName === 'All') {
        setrecipesFiltered(response4.meals);
      }
    }
    getIngredientsFromApi();
  }, [locationName]);

  function filterDropDown(event) {
    setLocationName(event.target.value);
  }

  function renderIngredientsCard() {
    console.log(recipesFiltered);
    const qty = 12;
    return (
      <div>
        <select
          data-testid="explore-by-area-dropdown"
          onChange={ (event) => filterDropDown(event) }
        >
          { location
            .map((recipe, index) => (
              <option
                data-testid={ `${recipe}-option` }
                key={ index }
              >
                { recipe }
              </option>
            )) }
          <option data-testid="All-option">All</option>
        </select>
        { recipesFiltered ? recipesFiltered
          .slice(0, qty)
          .map((recipe, index) => (
            <Link to={ `/comidas/${recipe.idMeal}` } key={ index }>
              <button
                key={ index }
                data-testid={ `${index}-recipe-card` }
                type="button"
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ recipe.strMealThumb }
                  alt={ recipe.strArea }
                  className="cardImage"
                />
                <p
                  data-testid={ `${index}-card-name` }
                >
                  { recipe.strMeal }
                </p>
              </button>
            </Link>
          )) : 'loading...'}
      </div>
    );
  }

  return (
    <main>
      <Header haveSearchBtn title="Explorar Origem" />
      <Footer />
      {location ? renderIngredientsCard() : 'loading...'}
    </main>
  );
}
