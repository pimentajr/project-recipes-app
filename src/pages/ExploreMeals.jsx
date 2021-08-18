import React from 'react';
import { useHistory } from 'react-router';

import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';

export default function ExploreMeals() {
  const history = useHistory();

  async function fetchRandomRecipe() {
    const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const request = await fetch(url);
    const data = await request.json();
    history.push(`/comidas/${data.meals[0].idMeal}`);
  }

  return (
    <div>
      <Header pageTitle="Explorar Comidas" itHasNotSearchButton />
      <main>
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explorar/comidas/ingredientes') }
        >
          Por Ingredientes
        </button>
        <button
          type="button"
          data-testid="explore-by-area"
          onClick={ () => history.push('/explorar/comidas/area') }
        >
          Por Local de Origem
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ () => fetchRandomRecipe() }
        >
          Me Surpreenda!
        </button>
      </main>
      <Footer />
    </div>
  );
}
