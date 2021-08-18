import React from 'react';
import { useHistory } from 'react-router';

import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';

export default function ExploreCocktails() {
  const history = useHistory();

  async function fetchRandomRecipe() {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const request = await fetch(url);
    const data = await request.json();
    history.push(`/bebidas/${data.drinks[0].idDrink}`);
  }

  return (
    <div>
      <Header pageTitle="Explorar Bebidas" itHasNotSearchButton />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explorar/bebidas/ingredientes') }
      >
        Por Ingredientes
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => fetchRandomRecipe() }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}
